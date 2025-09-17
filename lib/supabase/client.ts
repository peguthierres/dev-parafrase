import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder')) {
    // Return a mock client for build time
    return {
      from: (table: string) => ({
        select: () => ({
          eq: () => ({
            single: () => {
              if (table === 'authors') {
                return {
                  data: {
                    id: '1',
                    name: 'Autor de Exemplo',
                    bio: 'Este é um autor de exemplo para demonstração.',
                    birth_date: '1900-01-01',
                    death_date: null,
                    nationality: 'Brasileiro',
                    category: 'filosofo',
                    avatar_url: null,
                    is_classic: true,
                    user_id: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    quotes: [{ count: 5 }],
                    follows: [{ count: 10 }]
                  },
                  error: null
                }
              }
              if (table === 'quotes') {
                return {
                  data: {
                    id: '1',
                    content: 'Esta é uma frase de exemplo para demonstração.',
                    note: null,
                    is_approved: true,
                    is_featured: false,
                    views_count: 100,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    author: {
                      id: '1',
                      name: 'Autor de Exemplo',
                      category: 'filosofo',
                      avatar_url: null
                    },
                    submitted_by: null,
                    likes: [{ count: 15 }],
                    comments: [{ count: 3 }]
                  },
                  error: null
                }
              }
              return { data: null, error: null }
            },
            range: () => ({
              data: [],
              error: null
            }),
            order: () => ({
              range: () => ({
                data: [],
                error: null
              })
            })
          }),
          order: () => ({
            range: () => ({
              data: [],
              error: null
            })
          }),
          range: () => ({
            data: [],
            error: null
          }),
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
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => {
          return { data: { subscription: { unsubscribe: () => {} } }, error: null }
        }
      }
    } as any
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
