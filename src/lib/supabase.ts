import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we're in a browser environment and have the required env vars
const isClient = typeof window !== 'undefined';
const hasEnvVars = supabaseUrl && supabaseAnonKey;

let supabase: any = null;

if (isClient && hasEnvVars) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else if (isClient && !hasEnvVars) {
  console.warn('Supabase environment variables not found. Database features will be disabled.');
}

// Types for our database tables
export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: 'new' | 'read' | 'replied' | 'archived';
  created_at?: string;
}

export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  guests: number;
  special_requests?: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at?: string;
}

// Database functions with fallback for when Supabase is not available
export const contactService = {
  // Submit a contact message
  async submitContactMessage(message: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) {
    if (!supabase) {
      console.log('Contact message would be submitted:', message);
      throw new Error('Database connection not available. Please try again later.');
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([message])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Submit a reservation
  async submitReservation(reservation: Omit<Reservation, 'id' | 'created_at' | 'status'>) {
    if (!supabase) {
      console.log('Reservation would be submitted:', reservation);
      throw new Error('Database connection not available. Please try again later.');
    }

    const { data, error } = await supabase
      .from('reservations')
      .insert([reservation])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get all contact messages (for admin use)
  async getContactMessages() {
    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get all reservations (for admin use)
  async getReservations() {
    if (!supabase) {
      return [];
    }

    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Update reservation status
  async updateReservationStatus(id: string, status: Reservation['status']) {
    if (!supabase) {
      throw new Error('Database connection not available.');
    }

    const { data, error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update contact message status
  async updateContactMessageStatus(id: string, status: ContactMessage['status']) {
    if (!supabase) {
      throw new Error('Database connection not available.');
    }

    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

export { supabase };