import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const createUserManager = () => {
  return new UserManager({
    authority: process.env.NEXT_PUBLIC_AUTH_SERVER_URL || 'https://default-authority-url.com',
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
    client_secret:process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    post_logout_redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    response_type: 'code',
    scope: 'openid profile email',
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