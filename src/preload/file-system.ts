import fs from 'fs/promises';
import os from 'os';
import { type Dirent } from 'fs';
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
  const allContents = await fs.readdir(dirPath, { withFileTypes: true });

  //   Checks if the dirent is a directory but not a not a hidden directory, the system information directory, or the Recycle bin directory.
  const filteredFolders = allContents.filter((item) => item.isDirectory() && item.name[0] !== '.' && item.name.toLocaleLowerCase() !== `$RECYCLE.BIN`.toLocaleLowerCase() && item.name.toLocaleLowerCase() !== 'System Volume Information'.toLocaleLowerCase());
  return filteredFolders;
}

export async function getFiles(dirPath: string): Promise<Dirent<string>[]> {
  try {
    const allContents = await fs.readdir(dirPath, { withFileTypes: true });

    // TODO: Have this check if the file is a pdf or png file.
    const filteredFolder = allContents.filter((item) => item.isFile());
    return filteredFolder;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function readFile(filePath: string): Promise<string> {
  try {
    const file = await fs.readFile(filePath, { encoding: 'base64' });
    return file;
  } catch (error) {
    console.error(error);
    return '';
  }
}

export function getHomeDir(): string {
  return userHomeDir;
}

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

export async function initializeNewDir(dir: string): Promise<boolean> {
  try {
    const value = await fs.mkdir(dir, { recursive: true });
    if (value === undefined) {
      throw new Error(`Failed to create directory: ${dir}`);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getLetterFolderDirectories(dir: string): Promise<Dirent<string>[][]> {
  try {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letterFoldersArray = letters.split('').map((letter) => joinPaths(dir, letter));
    const letterFoldersDirectoriesArray: Dirent<string>[][] = [];

    // Validates the various letter folders
    //TODO: Have this reconfirm that the path is valid after creating it
    for (const letterFolder of letterFoldersArray) {
      const isValid = await validateDirectoryPath(letterFolder);

      if (!isValid) {
        const isCreated = await initializeNewDir(letterFolder);
        if (!isCreated) {
          throw new Error(`Failed to validate all letter folders, error caused by ${letterFolder}`);
        }
      }
    }

    for (const letterFolder of letterFoldersArray) {
      // TODO: Change this to push a custom object containing the dirName and its path
      const letterFolderDirectories = await getDirectories(letterFolder);
      letterFoldersDirectoriesArray.push(letterFolderDirectories);
    }

    return letterFoldersDirectoriesArray;
  } catch (error) {
    console.error(error);
    return [];
  }
}
