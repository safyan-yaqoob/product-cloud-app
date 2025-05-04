import { jwtDecode } from 'jwt-decode';
import { cookies, headers } from 'next/headers';

interface DecodedToken {
  sub: string;
  [key: string]: any;
}

export async function getUserIdFromServerToken(request?: Request): Promise<string | null> {
  try {
    // Try to get token from cookie first
    const cookieStore = cookies();
    const token = cookieStore.get('access_token')?.value;

    // If no token in cookies, try Authorization header
    if (!token && request) {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const headerToken = authHeader.split(' ')[1];
        if (!headerToken) return null;
        
        const decoded = jwtDecode<DecodedToken>(headerToken);
        return decoded.sub;
      }
    }

    if (!token) return null;
    
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.sub;
  } catch (error) {
    console.error('Error getting user ID from server token:', error);
    return null;
  }
}