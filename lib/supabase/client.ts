import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder')) {
    // Return a mock client for build time
    return {
      from: () => ({
        select: () => ({
          data: [],
          error: null
        }),
        insert: () => ({
          data: null,
          error: { message: 'Supabase não configurado' }
        }),
        update: () => ({
          data: null,
          error: { message: 'Supabase não configurado' }
        }),
        delete: () => ({
          data: null,
          error: { message: 'Supabase não configurado' }
        })
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
        signOut: () => Promise.resolve({ error: null })
      }
    } as any
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
