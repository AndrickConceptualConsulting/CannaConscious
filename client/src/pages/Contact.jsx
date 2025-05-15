import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Alert from '../components/UI/Alert';
import useForm from '../hooks/useForm';
import { contactAPI } from '../api';

// Form validation
const validateContactForm = (values) => {
  const errors = {};
  
  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!values.message.trim()) {
    errors.message = 'Message is required';
  }
  
  return errors;
};

export default function Contact() {
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const navigate = useNavigate();
  
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  
  const {
    values,
    errors,
    isSubmitting,
    formSubmitted,
    handleChange,
    handleSubmit,
    resetForm
  } = useForm(initialValues, validateContactForm);
  
  const submitForm = async (formData) => {
    try {
      await contactAPI.sendContactForm(formData);
      
      setAlert({
        show: true,
        type: 'success',
        message: 'Your message has been sent! We will get back to you soon.'
      });
      
      // Redirect to thank you page after a short delay
      setTimeout(() => {
        navigate('/thank-you', { 
          state: { 
            from: 'contact',
            name: formData.name
          } 
        });
      }, 2000);
      
    } catch (error) {
      setAlert({
        show: true,
        type: 'error',
        message: error.message || 'Failed to send your message. Please try again.'
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
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions or ready to elevate your cannabis business? 
            We're here to help you grow consciously.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-8 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <HiMail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email Us</h3>
                  <a 
                    href="mailto:contact@cannaconscious.com" 
                    className="text-gray-300 hover:text-primary transition"
                  >
                    contact@cannaconscious.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <HiPhone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Call Us</h3>
                  <a 
                    href="tel:+17201234567" 
                    className="text-gray-300 hover:text-primary transition"
                  >
                    (720) 123-4567
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-lg mr-4">
                  <HiLocationMarker className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-gray-300">
                    Denver, Colorado
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-medium mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-dark p-3 rounded-full hover:bg-primary/20 transition"
                >
                  <FaFacebook className="w-6 h-6 text-primary" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-dark p-3 rounded-full hover:bg-primary/20 transition"
                >
                  <FaInstagram className="w-6 h-6 text-primary" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-dark p-3 rounded-full hover:bg-primary/20 transition"
                >
                  <FaLinkedin className="w-6 h-6 text-primary" />
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(submitForm);
              }}>
                <Input
                  label="Your Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  error={errors.name}
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
                  label="Phone Number (Optional)"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                />
                
                <Input
                  label="Message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  textarea
                  error={errors.message}
                />
                
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    fullWidth 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
                
                <p className="text-sm text-gray-400 mt-4">
                  By submitting this form, you agree to our{' '}
                  <Link to="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
        
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-xl font-semibold text-primary mb-3">
                What services do you offer?
              </h3>
              <p className="text-gray-300">
                We offer a range of cannabis consulting services including compliance audits, 
                business strategy development, employee training, and sustainable cultivation practices.
              </p>
            </Card>
            
            <Card>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Where are you located?
              </h3>
              <p className="text-gray-300">
                We're based in Denver, Colorado, but provide consulting services throughout 
                the state and can work remotely with clients nationwide.
              </p>
            </Card>
            
            <Card>
              <h3 className="text-xl font-semibold text-primary mb-3">
                How quickly can you start working with us?
              </h3>
              <p className="text-gray-300">
                After an initial consultation, we can typically begin working with new clients 
                within 1-2 weeks, depending on the scope of the project and our current schedule.
              </p>
            </Card>
            
            <Card>
              <h3 className="text-xl font-semibold text-primary mb-3">
                Do you offer ongoing support?
              </h3>
              <p className="text-gray-300">
                Yes, we offer retainer packages for clients who need ongoing support and 
                consulting services. Contact us to learn more about our customized packages.
              </p>
            </Card>
          </div>
        </motion.div>
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