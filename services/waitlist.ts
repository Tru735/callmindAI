
import { WaitlistData } from '../types';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzznajkd';
// Local storage key for persistence
const LOCAL_STORAGE_KEY = 'callmind_waitlist_backup';

export interface ApiResponse {
  success: boolean;
  error?: 'invalid_email' | 'duplicate' | 'server_error';
}

/**
 * Retrieves the local waitlist backup from localStorage
 */
// Added to fix "no exported member 'getWaitlist'" error in AdminDashboard.tsx
export const getWaitlist = (): any[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse local waitlist', e);
    return [];
  }
};

/**
 * Clears the local waitlist backup from localStorage
 */
// Added to fix "no exported member 'clearWaitlist'" error in AdminDashboard.tsx
export const clearWaitlist = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

/**
 * Helper to save entries locally for the Admin Dashboard
 */
const saveToLocal = (data: WaitlistData, synced: boolean) => {
  const current = getWaitlist();
  const newItem = {
    ...data,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
    syncedToFormspree: synced
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...current, newItem]));
};

/**
 * Submits user to Formspree
 */
export const submitWaitlist = async (data: WaitlistData): Promise<ApiResponse> => {
  if (!validateEmail(data.email)) {
    return { success: false, error: 'invalid_email' };
  }

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        use_case: data.useCase,
        willingness_to_pay: data.willingnessToPay,
        calendly_link: data.calendlyLink,
        source: data.source,
        _subject: `CallMind Beta: ${data.email}`
      })
    });

    if (response.ok) {
      // Persist locally for the Admin Dashboard after successful sync
      saveToLocal(data, true);
      return { success: true };
    } else {
      const resData = await response.json();
      if (resData.error && resData.error.toLowerCase().includes('duplicate')) {
         return { success: false, error: 'duplicate' };
      }
      // Save locally even if sync fails so we don't lose the lead
      saveToLocal(data, false);
      return { success: false, error: 'server_error' };
    }
  } catch (error) {
    console.error('Waitlist Submission Error:', error);
    // Save locally on network error
    saveToLocal(data, false);
    return { success: false, error: 'server_error' };
  }
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
