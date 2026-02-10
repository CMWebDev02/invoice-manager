import fs, { constants } from 'fs/promises';
import os from 'os';
import { type Dirent } from 'fs';
import path from 'path';

// All Basic File System Functions

export const userHomeDir = os.homedir();

export function joinPaths(...dirPaths: string[]): string {
  const newDirPath = path.join(...dirPaths);
  return newDirPath;
}

export async function getDirectoryContents(dirPath: string): Promise<Dirent<string>[]> {
  const allContents = await fs.readdir(dirPath, { withFileTypes: true });
  return allContents;
}

export async function readFile(filePath: string): Promise<string> {
  const file = await fs.readFile(filePath, { encoding: 'base64' });
  return file;
}

export async function initializeNewDir(dir: string): Promise<void> {
  await fs.mkdir(dir);
  return;
}

export async function initializeNewFile(filePath: string): Promise<void> {
  // Initialize a new file with no content
  await fs.writeFile(filePath, '');
  return;
}

export async function appendContentToFile(filePath: string, newContent: string): Promise<void> {
  await fs.appendFile(filePath, newContent);
  return;
}

// TODO Change this to throw an error if anything other than invalid file path occurs, only allow the invalid directory error to return false
export async function validateDirectoryPath(dirPath: string): Promise<boolean> {
  try {
    //* Attempts to check the user's permissions for a file or directory, and if it can read the permissions from said file or directory it exists.
    await fs.access(dirPath);
    return true;
  } catch {
    //* If an error occurs due to the path not leading to any file or directory, then the file does not exist.
    return false;
  }
}

export async function transferFile(currentPath: string, newPath: string): Promise<void> {
  //* Final parameter indicates the action to avoid overwriting any files
  await fs.copyFile(currentPath, newPath, constants.COPYFILE_EXCL);
  //* Removes the old file if the copy action is successful
  await fs.rm(currentPath);
  return;
}

export async function removeDirectory(dirPath: string): Promise<void> {
  await fs.rmdir(dirPath);
  return;
}
