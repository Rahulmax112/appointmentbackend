import { config } from 'dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

config(); // 👈 This loads the .env file

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseKey: string = process.env.SUPABASE_KEY!;
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabase };
