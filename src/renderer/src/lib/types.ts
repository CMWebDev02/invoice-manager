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

export type ChangeLogEntry = {
  id: string;
  actionType: 'sorting' | 'creating';
  actionDetails: {
    itemName: string;
    itemPath: string;
  };
};
