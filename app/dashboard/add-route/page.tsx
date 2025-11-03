import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { RouteForm } from '@/components/route/route-form';

export default async function AddRoutePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">Log Your Route</h1>
        <p className="text-gray-600">Track your delivery route and compete on the leaderboards</p>
      </div>
      <RouteForm />
    </div>
  );
}

