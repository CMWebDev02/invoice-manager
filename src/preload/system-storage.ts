import Store from 'electron-store';
import { pullUserDrives } from './powershell';
import type { SorterDetails, ViewerDetails } from './types';

type StoreTypes = {
  userData: boolean;
  userDrives: string;
  sortersArray: SorterDetails[];
  viewersArray: ViewerDetails[];
};

const store = new Store<StoreTypes>();

export async function storeUserDrives(): Promise<void> {
  try {
    const userDrives = await pullUserDrives();
    userDrives.sort();
    store.set('userDrives', JSON.stringify(userDrives));
  } catch (error) {
    console.error(error);
  }
}

export function getUserDrives(): string[] {
  const drivesString: string = store.get('userDrives');
  const userDrives = JSON.parse(drivesString);
  return userDrives;
}

export function storeNewSorter(newSorter: SorterDetails): boolean {
  try {
    const currentSorters = store.get('sortersArray');
    currentSorters.push(newSorter);
    store.set('sortersArray', JSON.stringify(currentSorters));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
