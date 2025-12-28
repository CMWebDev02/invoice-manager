import type { SelectorDetails } from './types';

export function getSelectors(page: 'sorters' | 'viewers'): SelectorDetails[] {
  if (page === 'sorters' || page === 'viewers') {
    return window.api.storage.getSelectors(page);
  } else {
    return [];
  }
}

export function searchSelector(page: 'sorters' | 'viewers', selectorId: string): SelectorDetails {
  if (page === 'sorters') {
    return window.api.storage.searchSelector(page, selectorId);
  } else if (page === 'viewers') {
    const temp: SelectorDetails = {
      selectorId: '',
      selectorTitle: '',
      directoriesDestination: '',
      invoicesDestination: ''
    };
    return temp;
  } else {
    const temp: SelectorDetails = {
      selectorId: '',
      selectorTitle: '',
      directoriesDestination: '',
      invoicesDestination: ''
    };
    return temp;
  }
}

export function removeSelector(page: 'sorters' | 'viewers', selectorId: string): boolean {
  try {
    const isRemovalSuccessful = window.api.storage.removeSelector(page, selectorId);

    if (!isRemovalSuccessful) {
      throw new Error(`Failed to remove element from ${page} array!`);
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function storeSelector(page: 'sorters' | 'viewers', newSelector: SelectorDetails, isNew: boolean): Promise<boolean> {
  try {
    let isAdded: boolean;

    if (page === 'sorters' || page === 'viewers') {
      if (isNew) {
        isAdded = window.api.storage.storeNewSelector(page, newSelector);
      } else {
        isAdded = window.api.storage.updateSelector(page, newSelector);
      }

      if (isAdded) {
        return true;
      } else {
        throw new Error(`Failed to save new element to ${page} array`);
      }
    }

    throw new Error('Invalid page type!');
  } catch (error) {
    console.error(error);
    return false;
  }
}
