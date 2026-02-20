import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseAnonKey)

const isValidUrl = (url: string | undefined) => {
    return typeof url === 'string' && url.startsWith('https://') && !url.includes('YOUR_SUPABASE_URL')
}

const isConfigured = isValidUrl(supabaseUrl) && !!supabaseAnonKey
console.log('Is Supabase Configured:', isConfigured)

export const supabase = isConfigured
    ? createClient(supabaseUrl!, supabaseAnonKey!)
    : null
