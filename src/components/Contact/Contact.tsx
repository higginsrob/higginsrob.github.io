import React, { useState } from 'react';
import { ContactFormData } from '@/types';
import { validateEmail, validateRequired } from '@/utils';
import Button from '../Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required';
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validateRequired(formData.subject)) {
      newErrors.subject = 'Subject is required';
    }

    if (!validateRequired(formData.message)) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding bg-secondary-50 dark:bg-secondary-800">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
              Thank You!
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8">
              Your message has been sent successfully. I'll get back to you as soon as possible.
            </p>
            <Button
              variant="primary"
              onClick={() => setIsSubmitted(false)}
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-secondary-50 dark:bg-secondary-800">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-secondary-300 dark:border-secondary-600 focus:border-primary-500 focus:ring-primary-500'
                    } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-secondary-300 dark:border-secondary-600 focus:border-primary-500 focus:ring-primary-500'
                    } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.subject
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-secondary-300 dark:border-secondary-600 focus:border-primary-500 focus:ring-primary-500'
                  } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-secondary-300 dark:border-secondary-600 focus:border-primary-500 focus:ring-primary-500'
                  } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors resize-vertical`}
                  placeholder="Tell me about your project or just say hello!"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </div>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;