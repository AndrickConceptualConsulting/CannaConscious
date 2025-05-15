import Appointment from '../models/appointmentModel.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
export const createAppointment = async (req, res) => {
  try {
    const { 
      clientName, 
      email, 
      phone, 
      businessName, 
      serviceType, 
      appointmentDate, 
      timeSlot, 
      message 
    } = req.body;
    
    // Create appointment in database
    const appointment = await Appointment.create({
      clientName,
      email,
      phone,
      businessName,
      serviceType,
      appointmentDate,
      timeSlot,
      message
    });
    
    // Format date and time for emails
    const formattedDate = new Date(appointmentDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Send email notification to business
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Appointment Booking - ${clientName}`,
      html: `
        <h1>New Appointment Booking</h1>
        <p><strong>Name:</strong> ${clientName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Name:</strong> ${businessName || 'Not provided'}</p>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${timeSlot}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No additional message provided'}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to the client
    const confirmationEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your CannaConscious Appointment Confirmation',
      html: `
        <h1>Appointment Confirmation</h1>
        <p>Dear ${clientName},</p>
        <p>Thank you for booking an appointment with CannaConscious. We have scheduled your ${serviceType} appointment for:</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${timeSlot}</p>
        <p>If you need to reschedule or cancel your appointment, please contact us as soon as possible.</p>
        <p>Best regards,</p>
        <p>The CannaConscious Team</p>
      `
    };
    
    await transporter.sendMail(confirmationEmail);
    
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1 });
    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Public (with token validation)
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    // Update status instead of actually deleting
    appointment.status = 'canceled';
    await appointment.save();
    
    // Send cancellation email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Appointment Cancelled - ${appointment.clientName}`,
      html: `
        <h1>Appointment Cancellation</h1>
        <p>The following appointment has been cancelled:</p>
        <p><strong>Client:</strong> ${appointment.clientName}</p>
        <p><strong>Email:</strong> ${appointment.email}</p>
        <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${appointment.timeSlot}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get available time slots for a specific date
// @route   GET /api/appointments/availability/:date
// @access  Public
export const getAvailability = async (req, res) => {
  try {
    const { date } = req.params;
    
    // Default available time slots (business hours)
    const allTimeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM', 
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];
    
    // Find appointments for the specified date
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const appointments = await Appointment.find({
      appointmentDate: { $gte: startDate, $lte: endDate },
      status: { $ne: 'canceled' }
    });
    
    // Get booked time slots
    const bookedTimeSlots = appointments.map(app => app.timeSlot);
    
    // Filter out booked time slots
    const availableTimeSlots = allTimeSlots.filter(
      slot => !bookedTimeSlots.includes(slot)
    );
    
    res.status(200).json({ 
      success: true, 
      date: date,
      available: availableTimeSlots,
      booked: bookedTimeSlots
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};