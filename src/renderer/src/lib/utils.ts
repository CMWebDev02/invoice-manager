import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const subDirectoriesArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getTitleCase(str: string): string {
  const strArray = str.split(' ');
  const titleArray: string[] = [];

  for (const string of strArray) {
    titleArray.push(string.at(0)?.toUpperCase() + string.slice(1, string.length));
  }

  return titleArray.join(' ');
}

export function convertCamelCase(str: string): string {
  // Inserts a space between all lowercase and uppercase characters
  let newStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');

  //Capitalizes the first character of the sentence
  newStr = newStr.at(0)?.toUpperCase() + newStr.slice(1, newStr.length);

  return newStr;
}

export function getUniqueID(): string {
  // Credit: MrCano369x
  // https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
  return crypto.randomUUID();
}

export async function getAllDrives(): Promise<string[]> {
  const allDrives = await window.api.storage.getUserDrives();
  return allDrives;
}
