import { config } from 'dotenv';
config();

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.SUPABASE_URL!;
const supabaseKey  = process.env.SUPABASE_SERVICE_KEY!;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
