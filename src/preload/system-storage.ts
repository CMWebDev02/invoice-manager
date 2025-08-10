import Store from 'electron-store';
import { pullUserDrives } from './powershell';
type StoreTypes = {
  userData: boolean;
  userDrives: string;
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
