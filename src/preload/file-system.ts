import fs from 'fs/promises';
import os from 'os';
import { type Dirent } from 'fs';
import { spawn } from 'child_process';

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
    // pull the current drives from the computer and return them to the user

    const process = spawn('powershell.exe', ['(Get-Volume).DriveLetter']);
    // Currently, this returns the drive letters, create in a separate file and have it run when the program launches, also filter the drives and only allow a letter to be saved once.
    process.stdout.on('data', (data) => console.log(data.toString()));
    // return allDrives.map((drive) => drive.description);
    return ['a'];
  } catch (error) {
    console.log(error);
    return [];
  }
}
