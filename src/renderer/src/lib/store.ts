export type SelectorDetails = {
  selectorId: string;
  selectorTitle: string;
  directoriesDestination: string;
  invoicesDestination?: string;
};

export function getSelectors(page: 'sorters' | 'viewers'): SelectorDetails[] {
  if (page === 'sorters') {
    return window.api.storage.getSorters();
  } else if (page === 'viewers') {
    return [];
  } else {
    return [];
  }
}

export function searchSelector(page: 'sorters' | 'viewers', selectorId: string): SelectorDetails {
  if (page === 'sorters') {
    return window.api.storage.searchSorters(selectorId);
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

export async function storeSelector(page: 'sorters' | 'viewers', newSelector: SelectorDetails, isNew: boolean): Promise<boolean> {
  let isAdded: boolean;

  if (page === 'sorters') {
    if (isNew) {
      isAdded = window.api.storage.storeNewSorter(newSelector);
    } else {
      isAdded = window.api.storage.updateSorter(newSelector);
    }
    // TODO: Add a check to test if the sorter is already within the current sorters array.
    if (isAdded) return true;
  } else if (page === 'viewers') {
    return false;
  }

  return false;
}
