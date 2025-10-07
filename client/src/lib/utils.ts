import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurveDividerHeight() {
  if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      return 100;
  } else if (window.innerWidth >= 1024) {
      return 150;
  } else {
      return 75;
  }
}

export async function getAuthState(): Promise<boolean> {
  const response = await fetch(window.location.host === 'localhost:5173' ? 'http://localhost:3000/api/authenticated' : import.meta.env.VITE_API_DOMAIN + '/api/authenticated', { credentials: 'include' });
  const data = await response.json();
  return data.success;
}

export function getFetchUrl(endpoint: string) {
  if (window.location.host === 'localhost:5173') {
      return 'http://localhost:3000/' + endpoint
  }
  return `${import.meta.env.VITE_API_DOMAIN}/${endpoint}`
}