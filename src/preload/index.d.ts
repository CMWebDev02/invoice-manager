import { ElectronAPI } from '@electron-toolkit/preload';

type FileSystemTypes = {
  getDirectories: (dirPath: string) => Promise<Dirent<string>[]>;
  getHomeDir: () => string;
  getAllDrives: () => Promise<string[]>;
  joinPaths: (...dirPaths: string[]) => string;
  validateDirectoryPath: (dirPath: string) => Promise<boolean>;
};

type StorageTypes = {
  storeUserDrives: () => Promise<void>;
  storeNewSorter: (newSorter: SorterDetails) => boolean;
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
