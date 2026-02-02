import type { Dirent } from 'fs';
import { DirectoryExport, FileExport } from './types';
import { subDirectoriesArray } from './utils';

const file_system = window.api.file_system;

function initializeErrorMessage(error: Error | unknown): string {
  if (error instanceof Error) {
    return `Name: ${error.name} Cause: ${error.cause} - ${error.message}`;
  } else {
    return 'An Unknown Error has Occurred!';
  }
}

// Make this a static class
export class FileSystem {
  static _userHomeDir: string = file_system.userHomeDir;

  static async getDirectories(dirPath: string): Promise<Dirent<string>[]> {
    // TODO: Move this to the component for the directory selector
    //    Assigns user's home directory in the event an empty string is passed in.
    //   const dirPath = parentDirectoryPath === '' ? file_system.getHomeDir() : parentDirectoryPath;
    try {
      const allContents = await file_system.getDirectoryContents(dirPath);

      // Checks if the dirent is a directory but not a not a hidden directory, the system information directory, or the Recycle bin directory.
      const allDirectories = allContents.filter((item) => item.isDirectory() && item.name[0] !== '.' && item.name.toLocaleLowerCase() !== `$RECYCLE.BIN`.toLocaleLowerCase() && item.name.toLocaleLowerCase() !== 'System Volume Information'.toLocaleLowerCase());
      return allDirectories;
    } catch (error) {
      let message = `001 - Fetching Directories From ${dirPath}\n`;
      message += initializeErrorMessage(error);
      // TODO Have these write to a file
      console.error(message);
      throw new Error(`An Issue Occurred Fetching Directories`);
    }
  }

  static async getFiles(dirPath: string): Promise<Dirent<string>[]> {
    try {
      const allContents = await file_system.getDirectoryContents(dirPath);

      // Checks if the dirent is File.
      // TODO: Have this check if the file is a pdf or png file.
      const filteredFolder = allContents.filter((item) => item.isFile());
      return filteredFolder;
    } catch (error) {
      let message = `002 - Fetching Files From ${dirPath}\n`;
      message += initializeErrorMessage(error);
      // TODO Have these write to a file
      console.error(message);
      throw new Error(`An Issue Occurred Fetching Files`);
    }
  }

  static joinPaths(parentDir: string, childDir: string): string {
    try {
      const newDirPath = file_system.joinPaths(parentDir, childDir);
      return newDirPath;
    } catch (error) {
      let message = `003 - Joining Paths for Parent Path ${parentDir} and Child Path ${childDir}\n`;
      message += initializeErrorMessage(error);
      // TODO Have these write to a file
      console.error(message);
      throw new Error(`An Issue Occurred Joining Paths`);
    }
  }

  static async validateDirectoryPath(dirPath: string): Promise<boolean> {
    try {
      const isValidPath = file_system.validateDirectoryPath(dirPath);
      return isValidPath;
    } catch (error) {
      let message = `004 - Validating Path ${dirPath}\n`;
      message += initializeErrorMessage(error);
      // TODO Have these write to a file
      console.error(message);
      throw new Error(`An Issue Occurred Validating Paths`);
    }
  }

  static async initializeNewDir(dirPath: string): Promise<undefined> {
    try {
      await file_system.initializeNewDir(dirPath);
    } catch (error) {
      let message = `005 - Initializing Directory at ${dirPath}\n`;
      message += initializeErrorMessage(error);
      // TODO Have these write to a file
      console.error(message);
      throw new Error(`An Issue Occurred Creating New Directory`);
    }
  }

  static async validateSubDir(dirPath: string, subDir: string): Promise<string> {
    try {
      const isDirPathValid = await this.validateDirectoryPath(dirPath);
      if (!isDirPathValid) throw new Error('Invalid Directory Path', { cause: '004' });
      const yearSubDirPath = this.joinPaths(dirPath, subDir);

      const isYearFolderValid = await this.validateDirectoryPath(yearSubDirPath);
      if (!isYearFolderValid) {
        await this.initializeNewDir(yearSubDirPath);
      }

      return yearSubDirPath;
    } catch (error) {
      let message = `006 - Validating Sub Folder ${subDir} at path ${dirPath}\n`;
      message += initializeErrorMessage(error);
      // TODO Have these write to a file
      console.error(message);
      throw new Error(`An Issue Occurred Validating Sub Directory`);
    }
  }

  static async validateFileName(fileName: string, dirPath: string): Promise<string> {
    try {
      let currentFileName = fileName;
      let isNameTaken = false;

      do {
        const newFilePath = this.joinPaths(dirPath, currentFileName);
        isNameTaken = await this.validateDirectoryPath(newFilePath);

        if (isNameTaken) {
          // Checks for the windows duplicate file pattern, (X)
          // TODO: Update this to go up to two numbers only
          const copyPattern = /\((\d+)\)/;

          const hasPattern = copyPattern.test(currentFileName);
          if (hasPattern) {
            // Updates the value within the filename to reflect its copy number
            currentFileName = currentFileName.replace(copyPattern, (_, copyNumber) => `(${parseInt(copyNumber) + 1})`);
          } else {
            // Appends the copy indicator to the file
            // TODO Have this use the indexing value instead of appending .pdf to allow it to be used with different file types
            currentFileName = `${currentFileName.substring(0, currentFileName.lastIndexOf('.'))} (2).pdf`;
          }
        }
      } while (isNameTaken);

      return currentFileName;
    } catch (error) {
      let message = `007 - Validating File Name ${fileName} at path ${dirPath}\n`;
      message += initializeErrorMessage(error);
      // TODO Have these write to a file
      console.error(message);
      throw new Error(`An Issue Occurred Validating File Name`);
    }
  }

  static async transferFile(currentFileName: string, currentFilePath: string, newDirPath: string): Promise<string> {
    try {
      const isNewDirPathValid = await this.validateDirectoryPath(newDirPath);
      console.log(isNewDirPathValid);
      if (!isNewDirPathValid) throw new Error('Invalid Directory Path', { cause: '004' });
      const isFilePathValid = await this.validateDirectoryPath(currentFilePath);
      if (!isFilePathValid) throw new Error('Invalid File Path', { cause: '004' });

      const fileName = await this.validateFileName(currentFileName, newDirPath);

      const finalFilePath = this.joinPaths(newDirPath, fileName);

      await file_system.transferFile(currentFilePath, finalFilePath);
      return finalFilePath;
    } catch (error) {
      let message = `008 - Transferring File from ${currentFilePath} to ${newDirPath}\n`;
      message += initializeErrorMessage(error);
      // TODO Have these write to a file
      console.error(message);
      throw new Error(`An Issue Occurred Transferring File`);
    }
  }

  async removeDirectory(dirPath: string): Promise<undefined> {
    try {
      await window.api.file_system.removeDirectory(dirPath);
    } catch (error) {
      let message = `009 - Removing Directory ${dirPath}\n`;
      message += initializeErrorMessage(error);
      // TODO Have these write to a file
      console.error(message);
      throw new Error(`An Issue Occurred Removing A Directory`);
    }
  }

  static getUserHomeDir(): string {
    return this._userHomeDir;
  }
}

// move all sorter specific actions to this class and have use the FileSystem class
export class SorterActions {
  _directoriesDestination: string;
  _invoicesDestination: string;

  constructor(directoriesDestination: string, invoicesDestination: string) {
    this._directoriesDestination = directoriesDestination;
    this._invoicesDestination = invoicesDestination;
  }

  async getCurrentInvoice(): Promise<FileExport | null> {
    try {
      const isInvoiceDirValid = await FileSystem.validateDirectoryPath(this._invoicesDestination);
      if (!isInvoiceDirValid) throw new Error('Invoice Destination is invalid!', { cause: '004' });

      const invoicesDirectoryContent = await FileSystem.getFiles(this._invoicesDestination);
      const firstFile = invoicesDirectoryContent.at(0);

      if (firstFile === undefined) throw new Error('Directory Is Empty!', { cause: 'EMPTY' });

      const firstFilePath = FileSystem.joinPaths(firstFile.parentPath, firstFile.name);
      const currentInvoiceData = await file_system.readFile(firstFilePath);

      const firstFileObj: FileExport = {
        data: currentInvoiceData,
        name: firstFile.name,
        path: firstFilePath
      };

      return firstFileObj;
    } catch (error) {
      if (error instanceof Error && error.cause === 'EMPTY') {
        return null;
      } else {
        let message = `010 - Getting Current Invoice at ${this._invoicesDestination}\n`;
        message += initializeErrorMessage(error);
        // TODO Have these write to a file
        console.error(message);
        throw new Error(`An Issue Occurred Retrieving Current Invoice`);
      }
    }
  }

  async getSubDirectories(): Promise<DirectoryExport[][]> {
    try {
      const isDirValid = await FileSystem.validateDirectoryPath(this._directoriesDestination);
      if (!isDirValid) throw new Error('Directories Destination is invalid!', { cause: '004' });
      const subDirPaths: string[] = [];
      const subFoldersDirectoriesArray: DirectoryExport[][] = [];

      // Validates the various sub directories before attempting to retrieve their contents
      for (const subDir of subDirectoriesArray) {
        const subDirPath = await FileSystem.validateSubDir(this._directoriesDestination, subDir);
        subDirPaths.push(subDirPath);
      }

      for (const subDirPath of subDirPaths) {
        // Gathers all directories of the current sub directory
        const allDirectories = await FileSystem.getDirectories(subDirPath);
        // Iterates through all directories found and maps them to an object that holds their path and name.
        const SubFolderObjArray = allDirectories.map(({ name, parentPath }) => {
          const dirPath = FileSystem.joinPaths(parentPath, name);
          return { name, dirPath };
        });
        subFoldersDirectoriesArray.push(SubFolderObjArray);
      }

      return subFoldersDirectoriesArray;
    } catch (error) {
      let message = `011 - Getting Sub Folders at ${this._directoriesDestination}\n`;
      message += initializeErrorMessage(error);
      // TODO Have these write to a file
      console.error(message);
      throw new Error(`An Issue Occurred Retrieving Sub Directories`);
    }
  }
}
