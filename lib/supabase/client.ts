import { createBrowserClient } from '@supabase/ssr';
import { createMockClient } from './mock';

export function createClient() {
  // Demo mode: if Supabase is not configured, use mock client
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase not configured - running in demo mode');
    return createMockClient() as any;
  }
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

