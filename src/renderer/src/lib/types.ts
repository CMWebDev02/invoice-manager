import type { Dirent } from 'fs';

export type SelectorDetails = {
  selectorId: string;
  selectorTitle: string;
  directoriesDestination: string;
  invoicesDestination?: string;
};

export type DirectoryExport = {
  name: string;
  dirPath: string;
};

export type FileExport = {
  data: string;
  name: string;
  path: string;
};

export type FileInfo = {
  name: string;
  path: string;
};

export type ChangeLogEntry = {
  id: string;
  actionType: 'sort' | 'create' | 'undoSort' | 'undoCreate';
  actionDetails: {
    itemName: string;
    itemPath: string;
  };
  successful: boolean;
};

export type FileSystemTypes = {
  userHomeDir: string;
  joinPaths: (...dirPaths: string[]) => string;
  getDirectoryContents: (dirPath: string) => Promise<Dirent<string>[]>;
  readFile: (filePath: string) => Promise<string>;
  initializeNewDir: (dir: string) => Promise<void>;
  validateDirectoryPath: (dirPath: string) => Promise<boolean>;
  transferFile: (currentPath: string, newPath: string) => Promise<void>;
  removeDirectory: (dirPath: string) => Promise<void>;
  initializeNewFile: (filePath: string) => Promise<void>;
  appendContentToFile: (filePath: string, newContent: string) => Promise<void>;
};
