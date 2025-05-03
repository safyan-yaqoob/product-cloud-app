import { redirect } from 'next/navigation';
import OnboardingForm from '@/components/onboarding/OnboardingForm';

// Dummy data - replace with actual auth check
const isAuthenticated = true;

export default function OnboardingPage() {
  // In a real implementation, check auth status
  if (!isAuthenticated) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Organization Setup
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell us about your organization to get started
        </p>
      </div>
      <OnboardingForm />
    </div>
  );
} 