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

export async function storeSelector(page: 'sorters' | 'viewers', newSelector: SelectorDetails): Promise<boolean> {
  if (page === 'sorters') {
    // TODO: Add a check to test if the sorter is already within the current sorters array.
    const isAdded = window.api.storage.storeNewSorter(newSelector);
    if (isAdded) return true;
  } else if (page === 'viewers') {
    return false;
  }

  return false;
}
