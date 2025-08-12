import { ElectronAPI } from '@electron-toolkit/preload';

type FileSystemTypes = {
  getDirectories: (dirPath: string) => Promise<Dirent<string>[]>;
  getHomeDir: () => string;
  getAllDrives: () => Promise<string[]>;
  joinPaths: (...dirPaths: string[]) => string;
};

type InitializationTypes = {
  storeUserDrives: () => Promise<void>;
};

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      file_system: FileSystemTypes;
      initialization: InitializationTypes;
    };
  }
}
