import { clsx, type ClassValue } from 'clsx';
import { type Dirent } from 'fs';
import { twMerge } from 'tailwind-merge';
import type { DirectoryExport, FileExport } from './types';

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

export function getUniqueID(): string {
  // Credit: MrCano369x
  // https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
  return crypto.randomUUID();
}

export const userHomeDir = window.api.file_system.getHomeDir();

export async function getAllDrives(): Promise<string[]> {
  const allDrives = await window.api.storage.getUserDrives();
  return allDrives;
}

export async function getDirectories(parentDirectoryPath: string): Promise<Dirent<string>[]> {
  // Assigns user's home directory in the event an empty string is passed in.
  const dirPath = parentDirectoryPath === '' ? window.api.file_system.getHomeDir() : parentDirectoryPath;
  const allDirectories = await window.api.file_system.getDirectories(dirPath);
  return allDirectories;
}

export function joinPaths(parentDir: string, childDir: string): string {
  const newDirPath = window.api.file_system.joinPaths(parentDir, childDir);
  return newDirPath;
}

export async function validateDirectoryPath(dirPath: string): Promise<boolean> {
  try {
    const isValidPath = await window.api.file_system.validateDirectoryPath(dirPath);
    return isValidPath;
  } catch (error: unknown) {
    console.error(error);
    return false;
  }
}

export async function getLetterFolderDirectories(directoriesDestination: string): Promise<DirectoryExport[][] | null> {
  try {
    const isDirValid = await validateDirectoryPath(directoriesDestination);
    if (!isDirValid) throw new Error('Directories Destination is invalid!');

    const letterFolderDirectories = await window.api.file_system.getLetterFolderDirectories(directoriesDestination);

    return letterFolderDirectories;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCurrentInvoice(invoicesDestination: string): Promise<FileExport | null> {
  try {
    const isInvoiceDirValid = await validateDirectoryPath(invoicesDestination);
    if (!isInvoiceDirValid) throw new Error('Invoice Destination is invalid!');

    const invoicesDirectoryContent = await window.api.file_system.getFiles(invoicesDestination);

    const firstFile: Dirent = invoicesDirectoryContent.at(0);
    const firstFilePath = joinPaths(firstFile.parentPath, firstFile.name);

    const currentInvoiceData = await window.api.file_system.readFile(firstFilePath);

    const firstFileObj: FileExport = {
      data: currentInvoiceData,
      name: firstFile.name,
      path: firstFilePath
    };

    return firstFileObj;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function transferFile(fileObj: FileExport, dirObj: DirectoryExport, year: string): Promise<boolean> {
  try {
    const newFilePath = joinPaths(dirObj.dirPath, year);
    const fileName = await window.api.file_system.validateFileName(fileObj.name, newFilePath);

    console.log(fileName);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
