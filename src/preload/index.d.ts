import { ElectronAPI } from '@electron-toolkit/preload';

type FileSystemTypes = {
  getDirectories: (dirPath: string) => Promise<Dirent<string>[]>;
  getHomeDir: () => string;
  joinPaths: (...dirPaths: string[]) => string;
  validateDirectoryPath: (dirPath: string) => Promise<boolean>;
};

type StorageTypes = {
  storeUserDrives: () => Promise<boolean>;
  getUserDrives: () => Promise<string[]>;
  storeNewSorter: (newSorter: SorterDetails) => boolean;
  updateSorter: (changedSorter: SorterDetails) => boolean;
  searchSorters: (sorterId: string) => SorterDetails;
  removeSorter: (sorterId: string) => boolean;
  getSorters: () => SorterDetails[];
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
