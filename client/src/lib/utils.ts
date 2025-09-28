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