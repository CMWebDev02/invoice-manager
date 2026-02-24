import { FileSystem, SorterActions } from '@renderer/lib/file-system';
import { getUniqueID } from '@renderer/lib/utils';

export class SorterTest {
  _sorterActions: SorterActions;
  _foldersName: string;

  constructor(directoriesDestination: string, invoicesDestination: string, sorterTitle: string) {
    // Generates a random value
    const randomStringValues = getUniqueID().split('-');
    // Pulls the first 8 characters of the value
    const randomStringValue = randomStringValues[0];
    this._foldersName = `.temp-${randomStringValue}`;
    this._sorterActions = new SorterActions(directoriesDestination, invoicesDestination, sorterTitle);
  }

  async _initialPathsTest(): Promise<void> {
    this._sorterActions.validateDirectories();
  }

  async _directoryCreationTest(): Promise<void> {
    try {
      const tempDirectoriesDestination = FileSystem.joinPaths(this._sorterActions.directoryDestination, this._foldersName);
      const tempInvoicesDestination = FileSystem.joinPaths(this._sorterActions.invoicesDestination, this._foldersName);
      await FileSystem.initializeNewDir(tempDirectoriesDestination);
      await FileSystem.initializeNewDir(tempInvoicesDestination);

      const isDirectoriesDestinationValid = await FileSystem.validateDirectoryPath(tempDirectoriesDestination);
      const isInvoicesDestinationValid = await FileSystem.validateDirectoryPath(tempInvoicesDestination);

      if (isDirectoriesDestinationValid && isInvoicesDestinationValid) {
        return;
      } else {
        // Throws an error To indicate the creation failed
        throw new Error();
      }
    } catch {
      throw new Error('Directory Creation Test Failed');
    }
  }

  async _fileTransferTest(): Promise<void> {}

  async _duplicateFileTransferTest(): Promise<void> {}

  async _nonEmptyDirectoryDeletionTest(): Promise<void> {}

  async _directoryDeletionTest(): Promise<void> {}

  async initiateTests(): Promise<void> {
    this._initialPathsTest();
    this._directoryCreationTest();
    console.log('Test Over');
  }
}
