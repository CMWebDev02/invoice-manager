import { clsx, type ClassValue } from 'clsx';
import { type Dirent } from 'fs';
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

export async function getAllDrives(): Promise<string[]> {
  const allDrives = await window.api.file_system.getAllDrives();
  return allDrives;
}

export async function getDirectories(parentDirectoryPath: string): Promise<Dirent<string>[]> {
  const allDirectories = await window.api.file_system.getDirectories(parentDirectoryPath);
  return allDirectories;
}
