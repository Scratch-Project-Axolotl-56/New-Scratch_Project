// supabaseClient.js set up ; entrypoint to the rest of the Supabase functionality
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase project details
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize client
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);
