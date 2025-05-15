import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiCalendar, 
  HiClock, 
  HiOfficeBuilding, 
  HiUser,
  HiMail,
  HiPhone,
  HiClipboardCheck
} from 'react-icons/hi';

import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Alert from '../components/UI/Alert';
import useForm from '../hooks/useForm';
import { appointmentAPI } from '../api';

// Form validation
const validateAppointmentForm = (values) => {
  const errors = {};
  
  if (!values.clientName.trim()) {
    errors.clientName = 'Name is required';
  }
  
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  }
  
  if (!values.serviceType) {
    errors.serviceType = 'Service type is required';
  }
  
  if (!values.appointmentDate) {
    errors.appointmentDate = 'Date is required';
  }
  
  if (!values.timeSlot) {
    errors.timeSlot = 'Time slot is required';
  }
  
  return errors;
};

// Service types
const serviceTypes = [
  { id: 'consultation', name: 'Initial Consultation', duration: '60 min' },
  { id: 'compliance-audit', name: 'Compliance Audit', duration: '90 min' },
  { id: 'training', name: 'Staff Training Consultation', duration: '60 min' },
  { id: 'strategy-planning', name: 'Business Strategy Planning', duration: '90 min' },
  { id: 'other', name: 'Other Services', duration: '60 min' }
];

export default function BookOnline() {
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const navigate = useNavigate();
  
  const initialValues = {
    clientName: '',
    email: '',
    phone: '',
    businessName: '',
    serviceType: '',
    appointmentDate: '',
    timeSlot: '',
    message: ''
  };
  
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
    setErrors
  } = useForm(initialValues, validateAppointmentForm);
  
  // Check availability when date changes
  useEffect(() => {
    if (values.appointmentDate) {
      checkAvailability(values.appointmentDate);
    }
  }, [values.appointmentDate]);
  
  // Check available time slots for a date
  const checkAvailability = async (date) => {
    setIsCheckingAvailability(true);
    setValues({ ...values, timeSlot: '' }); // Reset selected time slot
    
    try {
      const response = await appointmentAPI.getAvailability(date);
      setAvailableTimeSlots(response.available || []);
      
      if (response.available && response.available.length === 0) {
        setAlert({
          show: true,
          type: 'warning',
          message: 'No available time slots for this date. Please select another date.'
        });
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setAlert({
        show: true,
        type: 'error',
        message: 'Failed to check availability. Please try again.'
      });
      setAvailableTimeSlots([]);
    } finally {
      setIsCheckingAvailability(false);
    }
  };
  
  // Handle form submission
  const submitForm = async (formData) => {
    try {
      await appointmentAPI.bookAppointment(formData);
      
      setAlert({
        show: true,
        type: 'success',
        message: 'Your appointment has been scheduled!'
      });
      
      // Redirect to thank you page
      setTimeout(() => {
        navigate('/thank-you', { 
          state: { 
            from: 'booking',
            name: formData.clientName,
            date: formData.appointmentDate,
            time: formData.timeSlot
          } 
        });
      }, 2000);
      
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        message: error.message || 'Failed to book appointment. Please try again.'
      });
    }
  };
  
  return (
    <main className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Book a Consultation
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Schedule a session with our cannabis consultants to discuss your business 
            needs and how we can help you grow.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Booking Form - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2"
          >
            <Card className="backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6">Schedule Your Appointment</h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(submitForm);
              }}>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    name="clientName"
                    value={values.clientName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    error={errors.clientName}
                    className="md:col-span-1"
                  />
                  
                  <Input
                    label="Business Name (Optional)"
                    name="businessName"
                    value={values.businessName}
                    onChange={handleChange}
                    placeholder="Your Cannabis Business"
                    className="md:col-span-1"
                  />
                  
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    error={errors.email}
                  />
                  
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    required
                    error={errors.phone}
                  />
                </div>
                
                <div className="mt-6">
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Service Type <span className="text-primary">*</span>
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {serviceTypes.map((service) => (
                      <div 
                        key={service.id}
                        className={`
                          border rounded-lg p-4 cursor-pointer transition
                          ${values.serviceType === service.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-gray-700 hover:border-gray-500'}
                        `}
                        onClick={() => setValues({ ...values, serviceType: service.id })}
                      >
                        <div className="flex items-center">
                          <input 
                            type="radio"
                            id={service.id}
                            name="serviceType"
                            value={service.id}
                            checked={values.serviceType === service.id}
                            onChange={handleChange}
                            className="hidden"
                          />
                          <div className={`
                            w-5 h-5 rounded-full border mr-3 flex items-center justify-center
                            ${values.serviceType === service.id 
                              ? 'border-primary' 
                              : 'border-gray-500'}
                          `}>
                            {values.serviceType === service.id && (
                              <div className="w-3 h-3 rounded-full bg-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-gray-400">{service.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.serviceType && (
                    <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Date <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiCalendar className="text-gray-500" />
                      </div>
                      <input
                        type="date"
                        name="appointmentDate"
                        value={values.appointmentDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`
                          w-full p-3 pl-10 rounded-lg 
                          bg-gray-900 border border-gray-700 
                          text-white placeholder-gray-500
                          focus:ring-2 focus:ring-primary focus:border-transparent
                          transition duration-200
                          outline-none
                        `}
                        required
                      />
                    </div>
                    {errors.appointmentDate && (
                      <p className="mt-1 text-sm text-red-500">{errors.appointmentDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Time <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiClock className="text-gray-500" />
                      </div>
                      <select
                        name="timeSlot"
                        value={values.timeSlot}
                        onChange={handleChange}
                        className={`
                          w-full p-3 pl-10 rounded-lg 
                          bg-gray-900 border border-gray-700 
                          text-white placeholder-gray-500
                          focus:ring-2 focus:ring-primary focus:border-transparent
                          transition duration-200
                          outline-none
                          ${!values.appointmentDate ? 'opacity-50' : ''}
                        `}
                        disabled={!values.appointmentDate || isCheckingAvailability}
                        required
                      >
                        <option value="">Select a time</option>
                        {isCheckingAvailability ? (
                          <option value="" disabled>Loading time slots...</option>
                        ) : (
                          availableTimeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))
                        )}
                      </select>
                    </div>
                    {errors.timeSlot && (
                      <p className="mt-1 text-sm text-red-500">{errors.timeSlot}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <Input
                    label="Additional Information (Optional)"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Let us know if you have any specific questions or requirements"
                    textarea
                  />
                </div>
                
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    fullWidth 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Booking...' : 'Schedule Appointment'}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
          
          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <h2 className="text-xl font-semibold mb-6">What to Expect</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <HiClipboardCheck className="text-primary w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Confirmation</h3>
                    <p className="text-sm text-gray-300">
                      You'll receive an email confirmation with all the details of your appointment.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <HiCalendar className="text-primary w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Scheduling</h3>
                    <p className="text-sm text-gray-300">
                      Choose a time that works for you. We offer both in-person and virtual consultations.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <HiUser className="text-primary w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Consultation</h3>
                    <p className="text-sm text-gray-300">
                      Our expert will discuss your business needs and provide customized guidance.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-primary/20 p-2 rounded-lg">
                      <HiOfficeBuilding className="text-primary w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Follow-Up</h3>
                    <p className="text-sm text-gray-300">
                      After your consultation, we'll provide a summary of recommendations and next steps.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="font-medium mb-3">Need Assistance?</h3>
                <p className="text-sm text-gray-300 mb-4">
                  If you have any questions or need help scheduling, contact us directly:
                </p>
                
                <div className="flex items-center mb-2">
                  <HiPhone className="text-primary mr-2" />
                  <a 
                    href="tel:+17201234567" 
                    className="text-gray-300 hover:text-primary transition"
                  >
                    (720) 123-4567
                  </a>
                </div>
                
                <div className="flex items-center">
                  <HiMail className="text-primary mr-2" />
                  <a 
                    href="mailto:appointments@cannaconscious.com" 
                    className="text-gray-300 hover:text-primary transition"
                  >
                    appointments@cannaconscious.com
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      
      {/* Alert notification */}
      <Alert
        isVisible={alert.show}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, show: false })}
      />
    </main>
  );
}