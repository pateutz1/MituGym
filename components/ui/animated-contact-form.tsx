import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { useState } from 'react';
import { createAccessibleVariants } from '@/hooks/useMotionConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Regex patterns for validation
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PHONE_REGEX = /^\+?[\d\s\-()]{10,}$/;

// Validation helper functions
const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Name is required';
  }
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return 'Phone number is required';
  }
  if (!PHONE_REGEX.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return null;
};

const validateService = (service: string): string | null => {
  if (!service) {
    return 'Please select a service';
  }
  return null;
};

const validateMessage = (message: string): string | null => {
  if (!message.trim()) {
    return 'Message is required';
  }
  if (message.trim().length < 10) {
    return 'Message must be at least 10 characters long';
  }
  return null;
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

// Success component
const SuccessMessage: React.FC = () => (
  <motion.div
    animate={{ opacity: 1, scale: 1 }}
    className="glass-effect rounded-2xl p-8 text-center"
    initial={{ opacity: 0, scale: 0.8 }}
  >
    <motion.div
      animate={{ scale: 1 }}
      className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
      initial={{ scale: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
    >
      <svg
        className="h-8 w-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <title>Success checkmark</title>
        <path
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </svg>
    </motion.div>
    <h3 className="mb-4 font-bold text-2xl text-white">Message Sent!</h3>
    <p className="text-white/70">
                  Thank you for your interest in FitPro Center. We&apos;ll get back to you within
      24 hours.
    </p>
  </motion.div>
);

// Form fields component
interface FormFieldsProps {
  formData: FormData;
  errors: FormErrors;
  handleChange: (field: keyof FormData, value: string) => void;
  fieldVariants: Record<string, Record<string, number | string>>;
  prefersReducedMotion: boolean;
  services: string[];
}

const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  errors,
  handleChange,
  fieldVariants,
  prefersReducedMotion,
  services,
}) => (
  <>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Name Field */}
      <motion.div
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.4, delay: 0.1 }
        }
        variants={fieldVariants}
      >
        <label
          className="mb-2 block font-medium text-sm text-white"
          htmlFor="name"
        >
          Full Name *
        </label>
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          id="name"
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter your full name"
          type="text"
          value={formData.name}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-red-400 text-sm"
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: -10 }}
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Email Field */}
      <motion.div
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.4, delay: 0.2 }
        }
        variants={fieldVariants}
      >
        <label
          className="mb-2 block font-medium text-sm text-white"
          htmlFor="email"
        >
          Email Address *
        </label>
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          id="email"
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Enter your email address"
          type="email"
          value={formData.email}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-red-400 text-sm"
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: -10 }}
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Phone Field */}
      <motion.div
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.4, delay: 0.3 }
        }
        variants={fieldVariants}
      >
        <label
          className="mb-2 block font-medium text-sm text-white"
          htmlFor="phone"
        >
          Phone Number *
        </label>
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          id="phone"
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="Enter your phone number"
          type="tel"
          value={formData.phone}
        />
        <AnimatePresence>
          {errors.phone && (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-red-400 text-sm"
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: -10 }}
            >
              {errors.phone}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Service Field */}
      <motion.div
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.4, delay: 0.4 }
        }
        variants={fieldVariants}
      >
        <label
          className="mb-2 block font-medium text-sm text-white"
          htmlFor="service"
        >
          Service Interest *
        </label>
        <select
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          id="service"
          onChange={(e) => handleChange('service', e.target.value)}
          value={formData.service}
        >
          <option className="bg-surface text-white" value="">
            Select a service
          </option>
          {services.map((service) => (
            <option
              className="bg-surface text-white"
              key={service}
              value={service}
            >
              {service}
            </option>
          ))}
        </select>
        <AnimatePresence>
          {errors.service && (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-red-400 text-sm"
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: -10 }}
            >
              {errors.service}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>

    {/* Message Field */}
    <motion.div
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : { duration: 0.4, delay: 0.5 }
      }
      variants={fieldVariants}
    >
      <label
        className="mb-2 block font-medium text-sm text-white"
        htmlFor="message"
      >
        Message *
      </label>
      <textarea
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        id="message"
        onChange={(e) => handleChange('message', e.target.value)}
        placeholder="Tell us about your fitness goals and how we can help you..."
        rows={4}
        value={formData.message}
      />
      <AnimatePresence>
        {errors.message && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-red-400 text-sm"
            exit={{ opacity: 0, y: -10 }}
            initial={{ opacity: 0, y: -10 }}
          >
            {errors.message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  </>
);

// Custom hook for form logic
const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameError = validateName(formData.name);
    if (nameError) {
      newErrors.name = nameError;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    const serviceError = validateService(formData.service);
    if (serviceError) {
      newErrors.service = serviceError;
    }

    const messageError = validateMessage(formData.message);
    if (messageError) {
      newErrors.message = messageError;
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleSubmit,
    handleChange,
  };
};

const AnimatedContactForm: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleSubmit,
    handleChange,
  } = useContactForm();

  const formVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  });

  const fieldVariants = createAccessibleVariants({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  });

  const buttonVariants = createAccessibleVariants({
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  });

  const services = [
    'General Inquiry',
    'Membership Information',
    'Personal Training',
    'Group Classes',
    'Nutrition Consulting',
    'Corporate Wellness',
    'Facility Tour',
  ];

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  return (
    <motion.form
      animate="visible"
      className="glass-effect space-y-6 rounded-2xl p-8"
      initial="hidden"
      onSubmit={handleSubmit}
      transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
      variants={formVariants}
    >
      <div className="mb-8 text-center">
        <h3 className="mb-2 font-bold text-2xl text-white">Get in Touch</h3>
        <p className="text-white/70">
          Ready to transform your fitness journey?
        </p>
      </div>

      <FormFields
        errors={errors}
        fieldVariants={fieldVariants}
        formData={formData}
        handleChange={handleChange}
        prefersReducedMotion={prefersReducedMotion}
        services={services}
      />

      {/* Submit Button */}
      <motion.div
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.4, delay: 0.6 }
        }
        variants={fieldVariants}
      >
        <motion.button
          className="w-full rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-8 py-4 font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          type="submit"
          variants={buttonVariants}
          whileHover={prefersReducedMotion ? undefined : 'hover'}
          whileTap={prefersReducedMotion ? undefined : 'tap'}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <title>Loading spinner</title>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
              Sending Message...
            </div>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default AnimatedContactForm;
