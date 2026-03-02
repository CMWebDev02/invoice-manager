import type { Dirent } from 'fs';
import { DirectoryExport, FileExport, FileInfo } from './types';
import { subDirectoriesArray } from './utils';
import { ErrorHandling } from './error-handling';

const file_system = window.api.file_system;

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
      const message = `001 - Fetching Directories From ${dirPath}\n`;
      ErrorHandling.updateErrorFile(message, error);
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
      const message = `002 - Fetching Files From ${dirPath}\n`;
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Fetching Files`);
    }
  }

  static joinPaths(...dirPaths: string[]): string {
    try {
      const newDirPath = file_system.joinPaths(...dirPaths);
      return newDirPath;
    } catch (error) {
      let message = `003 - Joining Paths\n`;
      for (const path of dirPaths) {
        message += ` | ${path} `;
      }
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Joining Paths`);
    }
  }

  static async validateDirectoryPath(dirPath: string): Promise<boolean> {
    try {
      const isValidPath = file_system.validateDirectoryPath(dirPath);
      return isValidPath;
    } catch (error) {
      const message = `004 - Validating Path ${dirPath}\n`;
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Validating Paths`);
    }
  }

  static async initializeNewDir(dirPath: string): Promise<undefined> {
    try {
      await file_system.initializeNewDir(dirPath);
    } catch (error) {
      const message = `005 - Initializing Directory at ${dirPath}\n`;
      ErrorHandling.updateErrorFile(message, error);
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
      const message = `006 - Validating Sub Folder ${subDir} at path ${dirPath}\n`;
      ErrorHandling.updateErrorFile(message, error);
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
      const message = `007 - Validating File Name ${fileName} at path ${dirPath}\n`;
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Validating File Name`);
    }
  }

  static async transferFile(currentFileName: string, currentFilePath: string, newDirPath: string): Promise<string> {
    try {
      const isNewDirPathValid = await this.validateDirectoryPath(newDirPath);
      if (!isNewDirPathValid) throw new Error('Invalid Directory Path', { cause: '004' });
      const isFilePathValid = await this.validateDirectoryPath(currentFilePath);
      if (!isFilePathValid) throw new Error('Invalid File Path', { cause: '004' });

      const finalFileName = await this.validateFileName(currentFileName, newDirPath);

      const finalFilePath = this.joinPaths(newDirPath, finalFileName);

      await file_system.transferFile(currentFilePath, finalFilePath);
      return finalFilePath;
    } catch (error) {
      const message = `008 - Transferring File from ${currentFilePath} to ${newDirPath}\n`;
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Transferring File`);
    }
  }

  static async removeDirectory(dirPath: string): Promise<undefined> {
    try {
      const isDirPathValid = await this.validateDirectoryPath(dirPath);
      if (!isDirPathValid) throw new Error('Invalid Directory Path', { cause: '004' });

      await window.api.file_system.removeDirectory(dirPath);
    } catch (error) {
      // Checks if the error an instance of the Error constructor and verifies the code property exists on it
      if (error instanceof Error && 'code' in error && error.code === 'ENOTEMPTY') {
        throw new Error(`Failed To Remove Directory - Directory Is Not Empty`, { cause: 'DirNotEmpty' });
      } else {
        const message = `009 - Removing Directory ${dirPath}\n`;
        ErrorHandling.updateErrorFile(message, error);
        throw new Error(`An Issue Occurred Removing A Directory`);
      }
    }
  }

  static async copyTestFile(dirPath: string): Promise<void> {
    try {
      const isDirPathValid = await this.validateDirectoryPath(dirPath);
      if (!isDirPathValid) throw new Error('Invalid Directory Path', { cause: '004' });

      await file_system.copyTestFile(dirPath);
      return;
    } catch (error) {
      const message = `014 - Copying Test File to ${dirPath}\n`;
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Copying File`);
    }
  }

  static async removeTestFile(testFilePath: string): Promise<void> {
    try {
      const isFilePathValid = await this.validateDirectoryPath(testFilePath);
      if (!isFilePathValid) throw new Error('Invalid Directory Path', { cause: '004' });

      await window.api.file_system.removeTestFile(testFilePath);
    } catch (error) {
      const message = `015 - Removing Test File - ${testFilePath}\n`;
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Removing Test File`);
    }
  }

  static getUserHomeDir(): string {
    return this._userHomeDir;
  }
}

export class SorterActions {
  directoryDestination: string;
  invoicesDestination: string;
  sorterTitle: string;
  _areDestinationsValid: boolean;

  constructor(directoriesDestination: string, invoicesDestination: string, sorterTitle: string) {
    this.directoryDestination = directoriesDestination;
    this.invoicesDestination = invoicesDestination;
    this.sorterTitle = sorterTitle;
    this._areDestinationsValid = false;
  }

  async validateDirectories(): Promise<void> {
    try {
      const isDirectoriesDestinationValid = await FileSystem.validateDirectoryPath(this.directoryDestination);
      if (!isDirectoriesDestinationValid) throw new Error('Invoice Destination is invalid!', { cause: '004' });

      const isInvoiceDestinationValid = await FileSystem.validateDirectoryPath(this.invoicesDestination);
      if (!isInvoiceDestinationValid) throw new Error('Invoice Destination is invalid!', { cause: '004' });

      this._areDestinationsValid = true;
    } catch (error) {
      const message = `013 - Validating Destinations | Directories: ${this.directoryDestination} | Invoices: ${this.invoicesDestination}\n`;
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Validating Destinations`);
    }
  }

  async getCurrentInvoice(): Promise<FileExport | null> {
    try {
      if (!this._areDestinationsValid) throw new Error('Destinations Are Invalid!', { cause: '013' });

      const isInvoiceDirValid = await FileSystem.validateDirectoryPath(this.invoicesDestination);
      if (!isInvoiceDirValid) throw new Error('Invoice Destination is invalid!', { cause: '004' });

      const invoicesDirectoryContent = await FileSystem.getFiles(this.invoicesDestination);
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
        const message = `010 - Getting Current Invoice at ${this.invoicesDestination}\n`;
        ErrorHandling.updateErrorFile(message, error);
        throw new Error(`An Issue Occurred Retrieving Current Invoice`);
      }
    }
  }

  async getSubDirectories(): Promise<DirectoryExport[][]> {
    try {
      if (!this._areDestinationsValid) throw new Error('Destinations Are Invalid!', { cause: '013' });

      const isDirValid = await FileSystem.validateDirectoryPath(this.directoryDestination);
      if (!isDirValid) throw new Error('Directories Destination is invalid!', { cause: '004' });
      const subDirPaths: string[] = [];
      const subFoldersDirectoriesArray: DirectoryExport[][] = [];

      // Validates the various sub directories before attempting to retrieve their contents
      for (const subDir of subDirectoriesArray) {
        const subDirPath = await FileSystem.validateSubDir(this.directoryDestination, subDir);
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
      const message = `011 - Getting Sub Folders at ${this.directoryDestination}\n`;
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Retrieving Sub Directories`);
    }
  }
}

export class ViewerActions {
  directoryDestination: string;
  sorterTitle: string;
  _isDestinationValid: boolean;

  constructor(directoriesDestination: string, sorterTitle: string) {
    this.directoryDestination = directoriesDestination;
    this.sorterTitle = sorterTitle;
    this._isDestinationValid = false;
  }

  async validateDestination(): Promise<void> {
    try {
      const isDirectoriesDestinationValid = await FileSystem.validateDirectoryPath(this.directoryDestination);
      if (!isDirectoriesDestinationValid) throw new Error('Invoice Destination is invalid!', { cause: '004' });

      this._isDestinationValid = true;
    } catch (error) {
      const message = `016 - Validating Directories Destination | Destination: ${this.directoryDestination}\n`;
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Validating Directories Destination`);
    }
  }

  async getInvoice(invoiceInfo: FileInfo): Promise<FileExport | null> {
    try {
      if (!this._isDestinationValid) throw new Error('Destinations Are Invalid!', { cause: '016' });

      const isInvoiceDirValid = await FileSystem.validateDirectoryPath(invoiceInfo.path);
      if (!isInvoiceDirValid) throw new Error('Invoice Path is invalid!', { cause: '004' });

      const currentInvoiceData = await file_system.readFile(invoiceInfo.path);

      // Spreads in the associated info from the invoiceInfo Object
      const fileObj: FileExport = {
        data: currentInvoiceData,
        ...invoiceInfo
      };

      return fileObj;
    } catch (error) {
      if (error instanceof Error && error.cause === 'EMPTY') {
        return null;
      } else {
        const message = `017 - Getting Invoice ${invoiceInfo.name} from its path - ${invoiceInfo.path}\n`;
        ErrorHandling.updateErrorFile(message, error);
        throw new Error(`An Issue Occurred Retrieving The Invoice`);
      }
    }
  }

  async getSubDirectories(): Promise<DirectoryExport[][]> {
    try {
      if (!this._isDestinationValid) throw new Error('Destinations Are Invalid!', { cause: '016' });

      const isDirValid = await FileSystem.validateDirectoryPath(this.directoryDestination);
      if (!isDirValid) throw new Error('Directories Destination is invalid!', { cause: '004' });
      const subDirPaths: string[] = [];
      const subFoldersDirectoriesArray: DirectoryExport[][] = [];

      // Validates the various sub directories before attempting to retrieve their contents
      for (const subDir of subDirectoriesArray) {
        const subDirPath = await FileSystem.validateSubDir(this.directoryDestination, subDir);
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
      const message = `018 - Getting Sub Folders at ${this.directoryDestination}\n`;
      ErrorHandling.updateErrorFile(message, error);
      throw new Error(`An Issue Occurred Retrieving Sub Directories`);
    }
  }

  async getAllFiles(dirPath: string): Promise<FileInfo[] | null> {
    try {
      if (!this._isDestinationValid) throw new Error('Destinations Are Invalid!', { cause: '016' });

      const isDirPathValid = await FileSystem.validateDirectoryPath(dirPath);
      if (!isDirPathValid) throw new Error('Directory Path is invalid!', { cause: '004' });

      const directoryContents = await FileSystem.getFiles(dirPath);

      if (directoryContents.length == 0) throw new Error('Directory Is Empty!', { cause: 'EMPTY' });

      const allFilesInfoArr: FileInfo[] = [];

      for (const file of directoryContents) {
        const filePath = FileSystem.joinPaths(file.parentPath, file.name);

        const fileObj: FileInfo = {
          name: file.name,
          path: filePath
        };

        allFilesInfoArr.push(fileObj);
      }

      return allFilesInfoArr;
    } catch (error) {
      if (error instanceof Error && error.cause === 'EMPTY') {
        return null;
      } else {
        const message = `019 - Getting Invoices from ${dirPath}\n`;
        ErrorHandling.updateErrorFile(message, error);
        throw new Error(`An Issue Occurred Retrieving All Invoices`);
      }
    }
  }
}
