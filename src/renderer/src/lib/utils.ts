import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getUserSaveData(page: 'sorters' | 'viewers'): string[] {
  if (page === 'sorters') {
    return ['Customer Documents', 'Payables'];
  } else if (page === 'viewers') {
    return ['Finances', 'Handbook'];
  } else {
    return [];
  }
}

export function getDirectories(parentDirectoryPath: string): string[] {
  return ['Temp', 'Temp 2'];
}
