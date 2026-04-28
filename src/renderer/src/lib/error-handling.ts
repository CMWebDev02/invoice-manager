import { FileSystem } from './file-system';
import type { FileSystemTypes } from './types';

export class ErrorHandling {
  static _errorFilePath: string = window.api.file_system.joinPaths(window.api.file_system.userHomeDir, 'AppData', 'Roaming', 'invoice-manager', 'Errors.txt');
  static _fileSystem: FileSystemTypes = window.api.file_system;

  static async _initializeErrorFile(): Promise<void> {
    try {
      await this._fileSystem.initializeNewFile(this._errorFilePath);
      return;
    } catch {
      console.error('Failed to Initialize Error File!');
    }
  }

  static _initializeErrorMessage(error: Error | unknown): string {
    // Gets the current date and time
    const currentDate = new Date();
    // Month needs to be offset by 1
    const date = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()} | ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    // Appends two line returns to make it easier to differentiate the errors in the file
    if (error instanceof Error) {
      return `${date} | Name: ${error.name} Cause: ${error.cause} - ${error.message}\n\n`;
    } else {
      return `${date} | An Unknown Error has Occurred!\n\n`;
    }
  }

  static async updateErrorFile(startingMessage: string, error: Error | unknown): Promise<void> {
    try {
      const isErrorFileValid = FileSystem.validateDirectoryPath(this._errorFilePath);
      if (!isErrorFileValid) {
        await this._initializeErrorFile();
      }

      // Appends the error message to the initial starting message
      const errorMessage = (startingMessage += this._initializeErrorMessage(error));
      await this._fileSystem.appendContentToFile(this._errorFilePath, errorMessage);
      return;
    } catch {
      console.error('Failed to Save Error To File!');
    }
  }
}
