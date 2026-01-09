import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { getDirectories, getFiles, getHomeDir, getLetterFolderDirectories, joinPaths, validateDirectoryPath, readFile, validateFileName, transferFile, initializeNewDir } from './file-system';
import { getSelectors, getUserDrives, removeSelector, searchSelector, storeNewSelector, storeUserDrives, updateSelector } from './system-storage';

// Custom APIs for renderer
const api = {
  file_system: {
    getDirectories,
    getHomeDir,
    joinPaths,
    validateDirectoryPath,
    getLetterFolderDirectories,
    getFiles,
    readFile,
    validateFileName,
    transferFile,
    initializeNewDir
  },
  storage: {
    storeUserDrives,
    getUserDrives,
    storeNewSelector,
    updateSelector,
    searchSelector,
    removeSelector,
    getSelectors
  }
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
