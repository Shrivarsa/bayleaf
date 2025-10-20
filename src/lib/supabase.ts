import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Reservation {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export const contactService = {
  async submitReservation(data: Omit<Reservation, 'id' | 'created_at' | 'status'>) {
    const { data: result, error } = await supabase
      .from('reservations')
      .insert([{ ...data, status: 'pending' }])
      .select()
      .single();

    if (error) throw error;
    return result;
  }
};