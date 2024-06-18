import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dvbtcusmixxdrunlpzfr.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2YnRjdXNtaXh4ZHJ1bmxwemZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NDQ1MTQsImV4cCI6MjAzNDMyMDUxNH0.FFwCij6WNyVPLA92s8uYmQKzYVoFlHetTBREp-QQq5I"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})