import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    trim: true
  },
  businessName: {
    type: String,
    trim: true
  },
  serviceType: {
    type: String,
    required: [true, 'Please select a service type'],
    enum: ['consultation', 'compliance-audit', 'training', 'strategy-planning', 'other']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Please select an appointment date']
  },
  timeSlot: {
    type: String,
    required: [true, 'Please select a time slot']
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'canceled'],
    default: 'scheduled'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;