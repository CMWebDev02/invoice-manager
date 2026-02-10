import { FileSystem } from './file-system';

const errorFilePath = FileSystem.joinPaths(FileSystem.getUserHomeDir(), 'AppData', 'Roaming', 'invoice-manager', 'Errors.txt');

async function initializeErrorFile() {
  try {
    FileSystem.initializeNewDir;
  } catch (error) {}
}

export async function updateErrorFile(error: Error): Promise<void> {
  try {
    const isErrorFileValid = FileSystem.validateDirectoryPath(errorFilePath);
    if (!isErrorFileValid) {
    }
  } catch (error) {}
}

export function initializeErrorMessage(error: Error | unknown): string {
  if (error instanceof Error) {
    return `Name: ${error.name} Cause: ${error.cause} - ${error.message}`;
  } else {
    return 'An Unknown Error has Occurred!';
  }
}
