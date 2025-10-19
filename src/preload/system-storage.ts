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
