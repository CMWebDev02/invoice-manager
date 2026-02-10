import { FileSystem } from './file-system';

const errorFilePath = FileSystem.joinMultiplePaths(FileSystem.getUserHomeDir(), "AppData", "Roaming", "invoice-manager", "");

export async function updateErrorFile(error: Error): Promise<void> {}

export function initializeErrorMessage(error: Error | unknown): string {
  if (error instanceof Error) {
    return `Name: ${error.name} Cause: ${error.cause} - ${error.message}`;
  } else {
    return 'An Unknown Error has Occurred!';
  }
}
