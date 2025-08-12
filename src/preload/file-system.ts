import fs from 'fs/promises';
import os from 'os';
import { type Dirent } from 'fs';
import { getUserDrives } from './system-storage';
import path from 'path';

const userHomeDir = os.homedir();

export function joinPaths(...dirPaths: string[]): string {
  try {
    const newDirPath = path.join(...dirPaths);
    return newDirPath;
  } catch (error) {
    console.error(error);
    return '';
  }
}

export async function getDirectories(dirPath: string): Promise<Dirent<string>[]> {
  const allFolders = await fs.readdir(dirPath, { withFileTypes: true });

  //   Checks if the dirent is a directory but not a not a hidden directory, the system information directory, or the Recycle bin directory.
  const filteredFolders = allFolders.filter((item) => item.isDirectory() && item.name[0] !== '.' && item.name.toLocaleLowerCase() !== `$RECYCLE.BIN`.toLocaleLowerCase() && item.name.toLocaleLowerCase() !== 'System Volume Information'.toLocaleLowerCase());
  return filteredFolders;
}

export function getHomeDir(): string {
  return userHomeDir;
}

export async function getAllDrives(): Promise<string[]> {
  try {
    // pull the current drives from the computer and return them to the user
    return getUserDrives();
  } catch (error) {
    console.log(error);
    return [];
  }
}
