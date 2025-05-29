import { UserManager, WebStorageStateStore } from "oidc-client-ts";
import { jwtDecode } from 'jwt-decode';
import { cookies, headers } from 'next/headers';

interface DecodedToken {
  sub: string;
  [key: string]: any;
}

export const createUserManager = () => {
  if (typeof window === 'undefined') return null;
  
  return new UserManager({
    authority: process.env.NEXT_PUBLIC_AUTH_SERVER_URL || 'https://default-authority-url.com',
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    post_logout_redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    response_type: 'code',
    scope: `${process.env.NEXT_PUBLIC_AUTH_SCOPE}`,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
  });
};

let userManager: UserManager | null = null;

export const getUserManager = () => {
  if (!userManager) {
    userManager = createUserManager();
  }
  return userManager;
};

// Client-side token handling
export async function getUserIdFromToken(): Promise<string | null> {
  try {
    const manager = getUserManager();
    if (!manager) return null;

    const currentUser = await manager.getUser();
    if (!currentUser?.access_token) return null;

    const decoded = jwtDecode<DecodedToken>(currentUser.access_token);
    return decoded.userId || decoded.sub;
  } catch (error) {
    console.error('Error getting user ID from token:', error);
    return null;
  }
}
