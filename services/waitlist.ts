import { WaitlistData } from '../types';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzznajkd';
const STORAGE_KEY = 'callmind_waitlist_backup';

export interface ApiResponse {
  success: boolean;
  error?: 'invalid_email' | 'duplicate' | 'server_error';
}

interface StoredWaitlistData extends WaitlistData {
  id: string;
  createdAt: string;
  syncedToFormspree: boolean;
}

/**
 * Submits user to Formspree and saves to local backup
 */
export const submitWaitlist = async (data: WaitlistData): Promise<ApiResponse> => {
  // 1. Client-side Validation
  if (!validateEmail(data.email)) {
    console.warn('Validation Error: Invalid email format');
    return { success: false, error: 'invalid_email' };
  }

  let synced = false;
  let result: ApiResponse = { success: false };

  // 2. Submit to Formspree (The Real Email Service)
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
        source: data.source,
        _subject: `New CallMind Waitlist: ${data.email}` // Custom email subject
      })
    });

    if (response.ok) {
      synced = true;
      result = { success: true };
    } else {
      const resData = await response.json();
      console.error('Formspree Error:', resData);
      // Check if Formspree says it's a duplicate
      if (resData.error && resData.error.toLowerCase().includes('duplicate')) {
         result = { success: false, error: 'duplicate' };
      } else {
         result = { success: false, error: 'server_error' };
      }
    }
  } catch (error) {
    console.error('Network Error:', error);
    result = { success: false, error: 'server_error' };
  }

  // 3. Save to Local Backup
  saveToLocalBackup(data, synced);

  return result;
};

// Helper to save to local storage
const saveToLocalBackup = (data: WaitlistData, synced: boolean) => {
    try {
        const current = getWaitlist();
        // Check for duplicate email in local storage to prevent spamming list
        const exists = current.find(u => u.email === data.email);
        if (exists) return; 

        const newItem: StoredWaitlistData = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            syncedToFormspree: synced
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, newItem]));
    } catch (e) {
        console.error("Failed to save to local storage", e);
    }
}

/**
 * Retrieves the local waitlist backup
 */
export const getWaitlist = (): StoredWaitlistData[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};

/**
 * Clears the local waitlist backup
 */
export const clearWaitlist = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear local storage", e);
    }
};

// Helper for regex validation
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};