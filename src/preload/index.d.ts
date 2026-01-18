import { ElectronAPI } from '@electron-toolkit/preload';

type FileSystemTypes = {
  userHomeDir: string;
  joinPaths: (...dirPaths: string[]) => string;
  getDirectoryContents: (dirPath: string) => Promise<Dirent<string>[]>;
  readFile: (filePath: string) => Promise<string>;
  initializeNewDir: (dir: string) => Promise<undefined>;
  validateDirectoryPath: (dirPath: string) => Promise<boolean>;
  transferFile: (currentPath: string, newPath: string) => Promise<undefined>;
  removeDirectory: (dirPath: string) => Promise<undefined>;
};

type StorageTypes = {
  storeUserDrives: () => Promise<boolean>;
  getUserDrives: () => Promise<string[]>;
  storeNewSelector: (selectorType: 'sorters' | 'viewers', newSorter: SelectorDetails) => boolean;
  updateSelector: (selectorType: 'sorters' | 'viewers', changedSorter: SelectorDetails) => boolean;
  searchSelector: (selectorType: 'sorters' | 'viewers', sorterId: string) => SelectorDetails;
  removeSelector: (selectorType: 'sorters' | 'viewers', sorterId: string) => boolean;
  getSelectors: (selectorType: 'sorters' | 'viewers') => SorterDetails[];
};

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      file_system: FileSystemTypes;
      storage: StorageTypes;
    };
  }
}
