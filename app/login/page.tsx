'use client';

import { GalleryVerticalEnd } from 'lucide-react';

import { LoginForm } from '@/components/login-form';

import { login } from './actions';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleFormSubmit = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const result = await login(formData);
    if (result.success) {
      redirect('/dashboard');
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Learning Centre
        </a>
        <LoginForm onFormSubmit={handleFormSubmit} errorMessage={errorMessage} />
      </div>
    </div>
  );
}
