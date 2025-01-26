import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common database operations
export const getUser = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserBalance = async (userId, newBalance) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ balance: newBalance })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createDeposit = async (userId, amount) => {
  const { data, error } = await supabase
    .from('deposits')
    .insert([
      {
        user_id: userId,
        amount,
        status: 'pending'
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createWithdrawal = async (userId, amount) => {
  const { data, error } = await supabase
    .from('withdrawals')
    .insert([
      {
        user_id: userId,
        amount,
        status: 'pending'
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserTransactions = async (userId) => {
  const { data: deposits, error: depositsError } = await supabase
    .from('deposits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (depositsError) throw depositsError;

  const { data: withdrawals, error: withdrawalsError } = await supabase
    .from('withdrawals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (withdrawalsError) throw withdrawalsError;

  return {
    deposits,
    withdrawals
  };
};