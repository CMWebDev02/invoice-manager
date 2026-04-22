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

export type UserSettings = {
  strictInputs: boolean;
};
