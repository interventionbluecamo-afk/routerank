// Mock Supabase client for demo mode when Supabase is not configured
export const createMockClient = () => {
  return {
    auth: {
      getUser: async () => ({
        data: { user: null },
        error: null,
      }),
      signInWithPassword: async () => ({
        data: { user: null, session: null },
        error: { message: 'Supabase not configured' },
      }),
      signUp: async () => ({
        data: { user: null, session: null },
        error: { message: 'Supabase not configured' },
      }),
      signOut: async () => ({
        error: null,
      }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          limit: async () => ({ data: [], error: null }),
        }),
        order: () => ({
          limit: async () => ({ data: [], error: null }),
        }),
        gte: () => ({
          select: async () => ({ data: [], error: null }),
        }),
      }),
      insert: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => ({
        eq: async () => ({ data: null, error: null }),
      }),
    }),
    storage: {
      from: () => ({
        upload: async () => ({
          data: null,
          error: { message: 'Supabase not configured' },
        }),
        getPublicUrl: () => ({
          data: { publicUrl: '' },
        }),
      }),
    },
  };
};


