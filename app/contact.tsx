'use client';

import { ContactForm, ContactFormValues } from '@/components/contact-form';
import { sendContactForm } from './actions';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (values: ContactFormValues) => {
    const { success, error } = await sendContactForm(values);
    if (success) {
      toast({
        title: 'Contact form submitted successfully',
        description: 'Thank you for contacting us!',
      });
      setSubmitted(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error submitting contact form',
        description: error,
      });
    }
  };
  return <ContactForm onSubmit={handleSubmit} submitted={submitted} />;
}
