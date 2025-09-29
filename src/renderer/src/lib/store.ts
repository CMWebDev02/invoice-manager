export type SelectorDetails = {
  selectorTitle: string;
  directoriesDestination: string;
  invoicesDestination?: string;
};

export function getSelectors(page: 'sorters' | 'viewers'): string[] {
  if (page === 'sorters') {
    return ['Customer Documents', 'Payables'];
  } else if (page === 'viewers') {
    return ['Finances', 'Handbook'];
  } else {
    return [];
  }
}

export async function storeNewSelector(page: 'sorters' | 'viewers', newSelector: SelectorDetails): Promise<boolean> {
  if (page === 'sorters') {
    const isAdded = window.api.storage.storeNewSorter(newSelector);
    if (isAdded) return true;
  } else if (page === 'viewers') {
    return false;
  }

  return false;
}
