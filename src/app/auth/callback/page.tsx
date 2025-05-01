'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserManager } from '@/lib/auth';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const userManager = getUserManager();
        await userManager.signinRedirectCallback();
        router.push('/modules/dashboard');
      } catch (error) {
        console.error('Callback error:', error);
        router.push('/');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Processing login...</div>
    </div>
  );
}