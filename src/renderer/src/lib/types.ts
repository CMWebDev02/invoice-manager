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
  actionType: 'sort' | 'create' | 'undoSort' | 'undoCreate';
  actionDetails: {
    itemName: string;
    itemPath: string;
  };
  successful: boolean;
};
