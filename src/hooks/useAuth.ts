import { User } from 'oidc-client-ts';
import { useEffect, useState } from 'react';
import { getUserManager } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userManager = getUserManager();

    const loadUser = async () => {
      try {
        const currentUser = await userManager.getUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    const handleUserLoaded = (user: User) => setUser(user);
    const handleUserUnloaded = () => setUser(null);

    userManager.events.addUserLoaded(handleUserLoaded);
    userManager.events.addUserUnloaded(handleUserUnloaded);

    return () => {
      userManager.events.removeUserLoaded(handleUserLoaded);
      userManager.events.removeUserUnloaded(handleUserUnloaded);
    };
  }, []);

  const login = async () => {
    try {
      await getUserManager().signinRedirect();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      const userManager = getUserManager();
      
      await userManager.removeUser();
      
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('oidc.') || key.startsWith('auth.')) {
          localStorage.removeItem(key);
        }
      });
      
      setUser(null);
      
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return { user, loading, login, logout };
};