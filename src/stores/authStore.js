import { defineStore } from 'pinia';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('mptopup_auth_user') || 'null'),
    profile: JSON.parse(localStorage.getItem('mptopup_auth_profile') || 'null'),
    session: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user),
    isAdmin: (state) => state.profile?.role === 'admin' || state.user?.role === 'admin' || state.user?.email === 'admin@mptopup.com',
    userFullName: (state) => state.profile?.full_name || state.user?.user_metadata?.full_name || state.user?.name || 'Member',
    userEmail: (state) => state.user?.email || '',
    userAvatar: (state) => state.profile?.avatar_url || state.user?.user_metadata?.avatar_url || state.user?.user_metadata?.picture || '/images/avatars/default-avatar.svg'
  },

  actions: {
    async initializeAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            this.session = session;
            this.user = session.user;
            await this.fetchProfile(session.user.id);
          }

          // Listener realtime auth state change
          supabase.auth.onAuthStateChange(async (event, newSession) => {
            this.session = newSession;
            this.user = newSession?.user || null;
            if (newSession?.user) {
              await this.fetchProfile(newSession.user.id);
            } else {
              this.profile = null;
              localStorage.removeItem('mptopup_auth_user');
              localStorage.removeItem('mptopup_auth_profile');
            }
          });
        } catch (err) {
          console.warn('Supabase auth initialization error:', err.message);
        }
      }
    },

    async fetchProfile(userId) {
      if (isSupabaseConfigured && supabase && userId) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (!error && data) {
            this.profile = data;
            localStorage.setItem('mptopup_auth_profile', JSON.stringify(data));
          }
        } catch (err) {
          console.warn('Fetch profile error:', err.message);
        }
      }
    },

    // 1. Login dengan Google OAuth
    async loginWithGoogle() {
      this.loading = true;
      this.error = null;

      if (isSupabaseConfigured && supabase) {
        try {
          const redirectUrl = `${window.location.origin}/auth/callback`;
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: redirectUrl,
              queryParams: {
                access_type: 'offline',
                prompt: 'consent'
              }
            }
          });
          if (error) throw error;
        } catch (err) {
          this.error = err.message || 'Gagal terhubung ke Google OAuth';
          this.loading = false;
          throw err;
        }
      } else {
        // Fallback Simulasi Google OAuth jika kredensial .env belum diisi
        await new Promise(r => setTimeout(r, 600));
        const mockGoogleUser = {
          id: 'usr-google-demo',
          email: 'google.user@gmail.com',
          name: 'Google Gamer Indonesia',
          role: 'member',
          avatar_url: '/images/avatars/default-avatar.svg',
          user_metadata: {
            full_name: 'Google Gamer Indonesia',
            avatar_url: '/images/avatars/default-avatar.svg'
          }
        };
        this.user = mockGoogleUser;
        this.profile = {
          id: mockGoogleUser.id,
          full_name: mockGoogleUser.name,
          email: mockGoogleUser.email,
          avatar_url: mockGoogleUser.avatar_url,
          role: 'member',
          balance: 150000
        };
        localStorage.setItem('mptopup_auth_user', JSON.stringify(this.user));
        localStorage.setItem('mptopup_auth_profile', JSON.stringify(this.profile));
        this.loading = false;
        return { user: this.user };
      }
    },

    // 2. Login Manual Email & Password
    async loginWithEmail(email, password) {
      this.loading = true;
      this.error = null;

      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (error) throw error;
          this.user = data.user;
          this.session = data.session;
          await this.fetchProfile(data.user.id);
          localStorage.setItem('mptopup_auth_user', JSON.stringify(this.user));
          this.loading = false;
          return data;
        } catch (err) {
          this.error = err.message || 'Email atau password salah';
          this.loading = false;
          throw err;
        }
      } else {
        // Fallback Login Dev Mode
        await new Promise(r => setTimeout(r, 400));
        const isAdminUser = email.toLowerCase().includes('admin');
        const mockUser = {
          id: isAdminUser ? 'usr-admin-01' : 'usr-member-01',
          email,
          name: isAdminUser ? 'Super Administrator' : 'Member Setia',
          role: isAdminUser ? 'admin' : 'member'
        };
        this.user = mockUser;
        this.profile = {
          id: mockUser.id,
          full_name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          balance: 250000
        };
        localStorage.setItem('mptopup_auth_user', JSON.stringify(this.user));
        localStorage.setItem('mptopup_auth_profile', JSON.stringify(this.profile));
        this.loading = false;
        return { user: mockUser };
      }
    },

    // 3. Registrasi Manual Email & Password
    async registerWithEmail(email, password, fullName, whatsapp) {
      this.loading = true;
      this.error = null;

      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                phone: whatsapp
              }
            }
          });
          if (error) throw error;
          this.user = data.user;
          this.loading = false;
          return data;
        } catch (err) {
          this.error = err.message || 'Gagal melakukan pendaftaran akun';
          this.loading = false;
          throw err;
        }
      } else {
        // Fallback Register Dev Mode
        await new Promise(r => setTimeout(r, 400));
        const newUser = {
          id: 'usr-' + Date.now(),
          email,
          name: fullName,
          role: 'member',
          phone: whatsapp
        };
        this.user = newUser;
        this.profile = {
          id: newUser.id,
          full_name: fullName,
          email,
          phone_number: whatsapp,
          role: 'member',
          balance: 0
        };
        localStorage.setItem('mptopup_auth_user', JSON.stringify(this.user));
        localStorage.setItem('mptopup_auth_profile', JSON.stringify(this.profile));
        this.loading = false;
        return { user: newUser };
      }
    },

    // 4. Logout
    async logout() {
      this.loading = true;
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.auth.signOut();
        } catch (err) {
          console.warn('Sign out error:', err);
        }
      }
      this.user = null;
      this.profile = null;
      this.session = null;
      localStorage.removeItem('mptopup_auth_user');
      localStorage.removeItem('mptopup_auth_profile');
      this.loading = false;
    }
  }
});
