import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { appendContentToFile, copyTestFile, getDirectoryContents, initializeNewDir, initializeNewFile, joinPaths, readFile, removeDirectory, removeTestFile, transferFile, userHomeDir, validateDirectoryPath } from './file-system';
import { getSelectors, getUserDrives, removeSelector, searchSelector, storeNewSelector, storeUserDrives, updateSelector } from './system-storage';

// Custom APIs for renderer
const api = {
  file_system: {
    userHomeDir,
    joinPaths,
    getDirectoryContents,
    readFile,
    initializeNewDir,
    validateDirectoryPath,
    transferFile,
    removeDirectory,
    initializeNewFile,
    appendContentToFile,
    copyTestFile,
    removeTestFile
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
