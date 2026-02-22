import { SorterActions } from '@renderer/lib/file-system';

export class SorterTest {
  _sorterActions: SorterActions;

  constructor(directoriesDestination: string, invoicesDestination: string, sorterTitle: string) {
    this._sorterActions = new SorterActions(directoriesDestination, invoicesDestination, sorterTitle);
  }

  async initialPathsTest(): Promise<void> {}

  async fileTransferTest(): Promise<void> {}
  
  async duplicateFileTransferTest(): Promise<void> {}

  async directoryCreationTest(): Promise<void> {}
  
  async directoryDeletionTest(): Promise<void> {}
  
  async nonEmptyDirectoryDeletionTest(): Promise<void> {}

  async initiateTest(): Promise<void> {
    
  }
}
