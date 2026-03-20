import { FileSystem, SorterActions, ViewerActions } from '@renderer/lib/file-system';
import { DirectoryContent, FileExport } from '@renderer/lib/types';
import { getUniqueID } from '@renderer/lib/utils';

export class SorterTest {
  _testFileName: string;
  _sorterActions: SorterActions;
  _tempDirectoriesDestination: string;
  _tempInvoicesDestination: string;

  constructor(directoriesDestination: string, invoicesDestination: string, sorterTitle: string) {
    this._testFileName = 'testPDF.pdf';

    // Generates a random value
    const randomStringValues = getUniqueID().split('-');
    // Pulls the first 8 characters of the value
    const randomStringValue = randomStringValues[0];
    const folderName = `.temp-${randomStringValue}`;
    this._tempDirectoriesDestination = FileSystem.joinPaths(directoriesDestination, folderName);
    this._tempInvoicesDestination = FileSystem.joinPaths(invoicesDestination, folderName);
    this._sorterActions = new SorterActions(directoriesDestination, invoicesDestination, sorterTitle);
  }

  async _initialPathsTest(): Promise<void> {
    try {
      await this._sorterActions.validateDirectories();
    } catch {
      throw new Error('Directory Initialization Failed', { cause: 'DirectoryInitialization' });
    }
  }

  async _directoryCreationTest(): Promise<void> {
    try {
      await FileSystem.initializeNewDir(this._tempDirectoriesDestination);
      await FileSystem.initializeNewDir(this._tempInvoicesDestination);

      const isDirectoriesDestinationValid = await FileSystem.validateDirectoryPath(this._tempDirectoriesDestination);
      const isInvoicesDestinationValid = await FileSystem.validateDirectoryPath(this._tempInvoicesDestination);

      if (!isDirectoriesDestinationValid && !isInvoicesDestinationValid) {
        // Throws an error To indicate the creation failed
        throw new Error();
      }

      return;
    } catch {
      throw new Error('Directory Creation Test Failed', { cause: 'DirectoryCreation' });
    }
  }

  async _fileTransferTest(): Promise<void> {
    try {
      // Copies the test pdf file to the directories destination and validates the action
      await FileSystem.copyTestFile(this._tempDirectoriesDestination);
      const copiedFilePath = FileSystem.joinPaths(this._tempDirectoriesDestination, this._testFileName);
      const isResourceFileCopied = await FileSystem.validateDirectoryPath(copiedFilePath);
      if (!isResourceFileCopied) {
        // Throws an error to indicate the copying of the file failed
        throw new Error();
      }

      // Transfers the test pdf file to the invoices destination from the directories destination
      const invoiceFilePath = await FileSystem.transferFile(this._testFileName, copiedFilePath, this._tempInvoicesDestination);
      const isInvoiceFileValid = await FileSystem.validateDirectoryPath(invoiceFilePath);
      if (!isInvoiceFileValid) {
        // Throws an error to indicate the transferring of a file failed
        throw new Error();
      }

      // Transfers the test pdf file to the directories destination from the invoices destination
      const directoriesFilePath = await FileSystem.transferFile(this._testFileName, invoiceFilePath, this._tempDirectoriesDestination);
      const isDirectoriesFileValid = await FileSystem.validateDirectoryPath(directoriesFilePath);
      if (!isDirectoriesFileValid) {
        // Throws an error to indicate the transferring of a file failed
        throw new Error();
      }

      return;
    } catch {
      throw new Error('File Transfer Test Failed', { cause: 'FileTransfer' });
    }
  }

  async _duplicateFileTransferTest(): Promise<void> {
    try {
      // Copies the test pdf file to the directories destination and validates the action
      await FileSystem.copyTestFile(this._tempInvoicesDestination);
      const copiedFilePath = FileSystem.joinPaths(this._tempInvoicesDestination, this._testFileName);
      const isResourceFileCopied = await FileSystem.validateDirectoryPath(copiedFilePath);
      if (!isResourceFileCopied) {
        // Throws an error to indicate the copying of the file failed
        throw new Error();
      }

      // Transfers the test pdf file to the directories destination from the invoices destination
      const invoiceFilePath = await FileSystem.transferFile(this._testFileName, copiedFilePath, this._tempDirectoriesDestination);
      const isInvoiceFileValid = await FileSystem.validateDirectoryPath(invoiceFilePath);
      if (!isInvoiceFileValid) {
        // Throws an error to indicate the transferring of a file failed
        throw new Error();
      }

      return;
    } catch {
      throw new Error('Duplicate File Transfer Test Failed', { cause: 'DuplicateFileTransfer' });
    }
  }

  async _nonEmptyDirectoryDeletionTest(): Promise<void> {
    try {
      await FileSystem.removeDirectory(this._tempDirectoriesDestination);
    } catch (error) {
      if (error instanceof Error && error.cause === 'DirNotEmpty') {
        return;
      } else {
        throw new Error('Removing NonEmpty Directory Test Failed', { cause: 'NonEmptyDirectoryDeletion' });
      }
    }
  }

  async _directoryDeletionTest(): Promise<void> {
    try {
      // Creates the second test file name using the same method as the validateFileName method
      const testFileNameTwo = `${this._testFileName.substring(0, this._testFileName.lastIndexOf('.'))} (2).pdf`;

      const testFilePath = FileSystem.joinPaths(this._tempDirectoriesDestination, this._testFileName);
      await FileSystem.removeTestFile(testFilePath);
      // Confirms that the testFile is successfully removed
      const isTestFileOneValid = await FileSystem.validateDirectoryPath(testFilePath);
      if (isTestFileOneValid) {
        // Throws an error to indicate the removing of the file failed
        throw new Error();
      }

      const testFilePathTwo = FileSystem.joinPaths(this._tempDirectoriesDestination, testFileNameTwo);
      await FileSystem.removeTestFile(testFilePathTwo);
      const isTestFileTwoValid = await FileSystem.validateDirectoryPath(testFilePathTwo);
      if (isTestFileTwoValid) {
        // Throws an error to indicate the removing of the file failed
        throw new Error();
      }

      await FileSystem.removeDirectory(this._tempDirectoriesDestination);
      const isTempDirectoriesDestinationValid = await FileSystem.validateDirectoryPath(this._tempDirectoriesDestination);
      if (isTempDirectoriesDestinationValid) {
        // Throws an error to indicate the removing of the directory failed
        throw new Error();
      }

      await FileSystem.removeDirectory(this._tempInvoicesDestination);
      const isTempInvoicesDestinationValid = await FileSystem.validateDirectoryPath(this._tempInvoicesDestination);
      if (isTempInvoicesDestinationValid) {
        // Throws an error to indicate the removing of the directory failed
        throw new Error();
      }
    } catch {
      throw new Error('Removing Directory Test Failed', { cause: 'DirectoryDeletion' });
    }
  }

  async initiateTests(): Promise<void> {
    try {
      await this._initialPathsTest();
      await this._directoryCreationTest();
      await this._fileTransferTest();
      await this._duplicateFileTransferTest();
      await this._nonEmptyDirectoryDeletionTest();
      await this._directoryDeletionTest();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`File System Validation Tests Failed\n ${error.name} - ${error.message}`);
      } else {
        throw new Error(`File System Validation Tests Failed\n Unknown - An Unknown Error Has Occurred`);
      }
    }
  }
}

export class ViewerTest {
  _testFileName: string;
  _viewerActions: ViewerActions;
  _tempDirectoriesDestination: string;

  constructor(directoriesDestination: string, sorterTitle: string) {
    this._testFileName = 'testPDF.pdf';

    // Generates a random value
    const randomStringValues = getUniqueID().split('-');
    // Pulls the first 8 characters of the value
    const randomStringValue = randomStringValues[0];
    const folderName = `.temp-${randomStringValue}`;
    this._tempDirectoriesDestination = FileSystem.joinPaths(directoriesDestination, folderName);
    this._viewerActions = new ViewerActions(directoriesDestination, sorterTitle);
  }

  async _initialPathTest(): Promise<void> {
    try {
      await this._viewerActions.validateDestination();
    } catch {
      throw new Error('Directory Initialization Failed', { cause: 'DirectoryInitialization' });
    }
  }

  async _directoryCreationTest(): Promise<void> {
    try {
      await FileSystem.initializeNewDir(this._tempDirectoriesDestination);

      const isDirectoriesDestinationValid = await FileSystem.validateDirectoryPath(this._tempDirectoriesDestination);

      if (!isDirectoriesDestinationValid) {
        // Throws an error To indicate the creation failed
        throw new Error();
      }

      return;
    } catch {
      throw new Error('Directory Creation Test Failed', { cause: 'DirectoryCreation' });
    }
  }

  async _fileCopyTest(): Promise<void> {
    try {
      // Copies the test pdf file to the directories destination and validates the action
      await FileSystem.copyTestFile(this._tempDirectoriesDestination);
      const copiedFilePath = FileSystem.joinPaths(this._tempDirectoriesDestination, this._testFileName);
      const isResourceFileCopied = await FileSystem.validateDirectoryPath(copiedFilePath);
      if (!isResourceFileCopied) {
        // Throws an error to indicate the copying of the file failed
        throw new Error();
      }

      return;
    } catch {
      throw new Error('File Copy Test Failed', { cause: 'FileTransfer' });
    }
  }

  async _fileReadTest(): Promise<void> {
    try {
      const testFilePath = FileSystem.joinPaths(this._tempDirectoriesDestination, this._testFileName);

      const testFileInfo: DirectoryContent = {
        name: this._testFileName,
        path: testFilePath,
        isDir: false
      };

      const testFileExport = await this._viewerActions.getInvoice(testFileInfo);

      if (testFileExport === null) {
        // Throws an error to indicate the reading of the file failed
        throw new Error();
      }

      return;
    } catch {
      throw new Error('File Reading Test Failed', { cause: 'FileTransfer' });
    }
  }

  async _directoryDeletionTest(): Promise<void> {
    try {
      const testFilePath = FileSystem.joinPaths(this._tempDirectoriesDestination, this._testFileName);
      await FileSystem.removeTestFile(testFilePath);
      // Confirms that the testFile is successfully removed
      const isTestFileOneValid = await FileSystem.validateDirectoryPath(testFilePath);
      if (isTestFileOneValid) {
        // Throws an error to indicate the removing of the file failed
        throw new Error();
      }

      await FileSystem.removeDirectory(this._tempDirectoriesDestination);
      const isTempDirectoriesDestinationValid = await FileSystem.validateDirectoryPath(this._tempDirectoriesDestination);
      if (isTempDirectoriesDestinationValid) {
        // Throws an error to indicate the removing of the directory failed
        throw new Error();
      }
    } catch {
      throw new Error('Removing Directory Test Failed', { cause: 'DirectoryDeletion' });
    }
  }

  async initiateTests(): Promise<void> {
    try {
      await this._initialPathTest();
      await this._directoryCreationTest();
      await this._fileCopyTest();
      await this._fileReadTest();
      await this._directoryDeletionTest();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`File System Validation Tests Failed\n ${error.name} - ${error.message}`);
      } else {
        throw new Error(`File System Validation Tests Failed\n Unknown - An Unknown Error Has Occurred`);
      }
    }
  }
}
