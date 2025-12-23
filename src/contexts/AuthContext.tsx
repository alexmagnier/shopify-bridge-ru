import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Partner {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  telegram: string | null;
  referral_code: string;
  status: string;
  tier: string;
  total_earnings: number;
  pending_balance: number;
  paid_out: number;
  total_referrals: number;
  active_referrals: number;
  conversion_rate: number;
  payment_method: string | null;
  payment_details: Record<string, unknown> | null;
  notifications: Record<string, boolean> | null;
  referred_by: string | null;
  registered_at: string;
  last_login_at: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  partner: Partner | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, data: SignUpData) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshPartner: () => Promise<void>;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  phone?: string;
  telegram?: string;
  referredBy?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchPartner = async (userId: string) => {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching partner:', error);
      return null;
    }

    return data as Partner;
  };

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin'
    });

    if (error) {
      console.error('Error checking admin role:', error);
      return false;
    }

    return data as boolean;
  };

  const refreshPartner = async () => {
    if (user) {
      const partnerData = await fetchPartner(user.id);
      setPartner(partnerData);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setTimeout(async () => {
            const partnerData = await fetchPartner(session.user.id);
            setPartner(partnerData);
            
            const adminStatus = await checkAdminRole(session.user.id);
            setIsAdmin(adminStatus);
            
            setIsLoading(false);
          }, 0);
        } else {
          setPartner(null);
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setTimeout(async () => {
          const partnerData = await fetchPartner(session.user.id);
          setPartner(partnerData);
          
          const adminStatus = await checkAdminRole(session.user.id);
          setIsAdmin(adminStatus);
          
          setIsLoading(false);
        }, 0);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    data: SignUpData
  ): Promise<{ error: Error | null }> => {
    try {
      const redirectUrl = `${window.location.origin}/partners/dashboard`;

      // Триггер handle_new_partner автоматически создаёт запись в partners и user_roles
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone || null,
            telegram: data.telegram || null,
            referredBy: data.referredBy || null,
          }
        }
      });

      if (authError) {
        return { error: authError };
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    try {
      const { data: signInData, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { error };
      }

      if (signInData.user) {
        await supabase.from('partners').update({
          last_login_at: new Date().toISOString()
        }).eq('id', signInData.user.id);
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setPartner(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        partner,
        isLoading,
        isAdmin,
        signUp,
        signIn,
        signOut,
        refreshPartner
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

