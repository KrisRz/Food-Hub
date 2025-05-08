'use client';

import { useState } from "react";
import { validateEmail, validatePhone } from '@/app/lib/utils';
import Card from '@/app/ui/Card';
import Button from '@/app/ui/Button';
import Input from '@/app/ui/Input';
import Badge from '@/app/ui/Badge';

function FoodOrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryNotes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        success: true,
        message: 'Order submitted successfully! We will contact you shortly.'
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        deliveryNotes: ''
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to submit order. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="123-456-7890"
          required
        />
        
        <Input
          label="Delivery Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          required
        />
        
        <Input
          label="Delivery Notes (Optional)"
          name="deliveryNotes"
          value={formData.deliveryNotes}
          onChange={handleChange}
          placeholder="Any special instructions for delivery?"
        />
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Place Order'}
        </Button>

        {submitStatus.message && (
          <div className={`mt-4 p-4 rounded-md ${
            submitStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <Badge variant={submitStatus.success ? 'success' : 'error'}>
              {submitStatus.message}
            </Badge>
          </div>
        )}
      </form>
    </Card>
  );
}

export default FoodOrderForm;
