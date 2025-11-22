import Store from 'electron-store';
import { pullUserDrives } from './powershell';
import type { SorterDetails, ViewerDetails } from './types';

type StoreTypes = {
  userData: boolean;
  userDrives: string;
  sortersArray: string;
  viewersArray: string;
};

const store = new Store<StoreTypes>();

export async function storeUserDrives(): Promise<boolean> {
  try {
    const userDrives = await pullUserDrives();
    userDrives.sort();
    store.set('userDrives', JSON.stringify(userDrives));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getUserDrives(): string[] {
  try {
    const drivesString: string = store.get('userDrives');
    const userDrives = JSON.parse(drivesString);
    return userDrives;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function storeNewSorter(newSorter: SorterDetails): boolean {
  try {
    const currentSorters = getSorters();
    currentSorters.push(newSorter);
    store.set('sortersArray', JSON.stringify(currentSorters));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function updateSorter(changedSorter: SorterDetails): boolean {
  try {
    // Will indicate if the selected sorter was found and updated
    let hasUpdateOccurred = false;

    const currentSorters = getSorters();
    for (const index in currentSorters) {
      if (currentSorters[index].selectorId == changedSorter.selectorId) {
        currentSorters[index] = changedSorter;
        hasUpdateOccurred = true;
      }
    }
    store.set('sortersArray', JSON.stringify(currentSorters));
    return hasUpdateOccurred;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function searchSorters(sorterId: string): SorterDetails {
  try {
    const currentSorters = getSorters();
    for (let index = 0; index < currentSorters.length; index++) {
      if (currentSorters[index].selectorId == sorterId) {
        return currentSorters[index];
      }
    }

    throw new Error('Sorter not found!');
  } catch (error) {
    console.error(error);
    const temp: SorterDetails = {
      selectorId: '',
      selectorTitle: '',
      directoriesDestination: '',
      invoicesDestination: ''
    };
    return temp;
  }
}

export function removeSorter(sorterId: string): boolean {
  try {
    const currentSorters = getSorters();

    for (let index = 0; index < currentSorters.length; index++) {
      if (currentSorters[index].selectorId == sorterId) {
        currentSorters.splice(index, 1);
        store.set('sortersArray', JSON.stringify(currentSorters));
        return true;
      }
    }

    throw new Error('Sorter not found!');
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getSorters(): SorterDetails[] {
  try {
    const currentSorters = store.get('sortersArray') ?? [];
    const currentSortersArray = JSON.parse(currentSorters);
    return currentSortersArray;
  } catch (error) {
    console.error(error);
    return [];
  }
}
