import { useState } from 'react';

export default function useForm(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setValues({
      ...values,
      [name]: value
    });
    
    // Clear errors for this field when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setIsSubmitting(false);
    setFormSubmitted(false);
  };

  // Validate form and return if it's valid
  const validateForm = () => {
    if (!validate) return true;
    
    const formErrors = validate(values);
    setErrors(formErrors);
    
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (callback) => {
    setIsSubmitting(true);
    
    const isValid = validateForm();
    
    if (isValid) {
      try {
        await callback(values);
        setFormSubmitted(true);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    formSubmitted,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
}