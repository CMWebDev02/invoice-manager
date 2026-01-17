import { ElectronAPI } from '@electron-toolkit/preload';

type FileSystemTypes = {
  getDirectories: (dirPath: string) => Promise<Dirent<string>[]>;
  getHomeDir: () => string;
  joinPaths: (...dirPaths: string[]) => string;
  validateDirectoryPath: (dirPath: string) => Promise<boolean>;
  getLetterFolderDirectories: (dir: string) => Promise<DirectoryExport[][]>;
  getFiles: (dirPath: string) => Promise<Dirent<string>[]>;
  readFile: (filePath: string) => Promise<string>;
  validateFileName: (fileName: string, parentPath: string) => Promise<string>;
  transferFile: (currentPath: string, newPath: string) => Promise<boolean>;
  initializeNewDir: (dir: string) => Promise<boolean>;
  removeDirectory: (dirPath: string) => Promise<boolean>;
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
