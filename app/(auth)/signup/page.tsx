import Link from 'next/link';
import { AuthForm } from '@/components/auth/auth-form';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-black mb-2 block">
            RouteRank
          </Link>
          <h1 className="text-3xl font-bold text-black mb-2">Start tracking</h1>
          <p className="text-gray-600">Create your account to join the competition</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <AuthForm mode="signup" />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-black hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


