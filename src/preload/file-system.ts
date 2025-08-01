import fs from 'fs/promises';
import os from 'os';
import { getDiskInfo } from 'node-disk-info';
import { type Dirent } from 'fs';

const userHomeDir = os.homedir();

export async function getDirectories(dirPath: string): Promise<Dirent<string>[]> {
  const allFolders = await fs.readdir(dirPath, { withFileTypes: true });

  //   Checks if the dirent is a directory but not a not a hidden directory, the system information directory, or the Recycle bin directory.
  const filteredFolders = allFolders.filter((item) => item.isDirectory() && item.name[0] !== '.' && item.name.toLocaleLowerCase() !== `\\$RECYCLE.BIN`.toLocaleLowerCase() && item.name.toLocaleLowerCase() !== 'System Volume Information'.toLocaleLowerCase());
  return filteredFolders;
}

export function getHomeDir(): string {
  return userHomeDir;
}

export async function getAllDrives(): Promise<string[]> {
  try {
    const allDrives = await getDiskInfo();
    return allDrives.map((drive) => drive.mounted);
  } catch (error) {
    console.log(error);
    return [];
  }
}
