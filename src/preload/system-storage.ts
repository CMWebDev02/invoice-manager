import Store from 'electron-store';
import { pullUserDrives } from './powershell';
import type { SelectorDetails, UserSettings } from './types';

type StoreTypes = {
  userData: boolean;
  userDrives: string;
  sortersArray: string;
  viewersArray: string;
  userSettings: string;
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
    const userDrives: string[] = JSON.parse(drivesString);
    return userDrives;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function storeNewSelector(selectorType: 'sorters' | 'viewers', newSorter: SelectorDetails): boolean {
  try {
    const currentSorters = getSelectors(selectorType);
    currentSorters.push(newSorter);
    setSelectors(selectorType, currentSorters);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function updateSelector(selectorType: 'sorters' | 'viewers', changedSorter: SelectorDetails): boolean {
  try {
    // Will indicate if the selected sorter was found and updated
    let hasUpdateOccurred = false;

    const currentSorters = getSelectors(selectorType);
    for (const index in currentSorters) {
      if (currentSorters[index].selectorId === changedSorter.selectorId) {
        currentSorters[index] = changedSorter;
        hasUpdateOccurred = true;
      }
    }
    setSelectors(selectorType, currentSorters);
    return hasUpdateOccurred;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function searchSelector(selectorType: 'sorters' | 'viewers', sorterId: string): SelectorDetails {
  try {
    const currentSelectors = getSelectors(selectorType);
    for (let index = 0; index < currentSelectors.length; index++) {
      if (currentSelectors[index].selectorId == sorterId) {
        return currentSelectors[index];
      }
    }

    throw new Error('Sorter not found!');
  } catch (error) {
    console.error(error);
    const temp: SelectorDetails = {
      selectorId: '',
      selectorTitle: '',
      directoriesDestination: '',
      invoicesDestination: ''
    };
    return temp;
  }
}

export function removeSelector(selectorType: 'sorters' | 'viewers', sorterId: string): boolean {
  try {
    const currentSelectors: SelectorDetails[] = getSelectors(selectorType);

    for (let index = 0; index < currentSelectors.length; index++) {
      if (currentSelectors[index].selectorId == sorterId) {
        currentSelectors.splice(index, 1);
        setSelectors(selectorType, currentSelectors);
        return true;
      }
    }

    throw new Error('Sorter not found!');
  } catch (error) {
    console.error(error);
    return false;
  }
}

function setSelectors(selectorType: 'sorters' | 'viewers', selectorsArray: SelectorDetails[]): boolean {
  try {
    if (selectorType === 'sorters') {
      store.set('sortersArray', JSON.stringify(selectorsArray));
      return true;
    } else if (selectorType === 'viewers') {
      store.set('viewersArray', JSON.stringify(selectorsArray));
      return true;
    }

    throw new Error(`Failed to save selectors!`);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getSelectors(selectorType: 'sorters' | 'viewers'): SelectorDetails[] {
  try {
    if (selectorType === 'sorters') {
      const currentSorters = store.get('sortersArray', '');
      // Checks if there is a stored viewersArray, else return an empty array.
      const currentSortersArray: SelectorDetails[] = currentSorters !== '' ? JSON.parse(currentSorters) : [];
      return currentSortersArray;
    } else if (selectorType === 'viewers') {
      const currentViewers = store.get('viewersArray', '');
      // Checks if there is a stored viewersArray, else return an empty array.
      const currentViewersArray: SelectorDetails[] = currentViewers !== '' ? JSON.parse(currentViewers) : [];
      return currentViewersArray;
    }

    throw new Error('Invalid selector type!');
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Called upon first loading the application and checks if there is a stored user settings object already present
// and stores a default settings object if one is not already stored
// The return boolean will indicate if the sorter is
export function initializeUserSettings(userSettingsObj: UserSettings): void {
  try {
    const userSettingsString: string = store.get('userSettings');
    if (userSettingsString === undefined) {
      store.set('userSettings', JSON.stringify(userSettingsObj));
    }
  } catch (error) {
    console.error(error);
  }
}

export function updateUserSettings(userSettingsObj: UserSettings): boolean {
  try {
    store.set('userSettings', JSON.stringify(userSettingsObj));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function retrieveUserSettings(): UserSettings | false {
  try {
    const userSettingsString: string = store.get('userSettings');
    const userSettings: UserSettings = JSON.parse(userSettingsString);
    return userSettings;
  } catch (error) {
    console.error(error);
    throw new Error('An Unexpected Error Occurred Getting User Settings!');
  }
}
