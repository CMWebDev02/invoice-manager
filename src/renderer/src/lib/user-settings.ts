import { UserSettingsTypes } from './types';

export class UserSettings {
  static getDefaultSettings(): UserSettingsTypes {
    const defaultUserSettings: UserSettingsTypes = {
      strictInputs: false,
      quickSelectInSearchBars: false
    };
    return { ...defaultUserSettings };
  }

  static initializeUserSettings(): void {
    window.api.storage.initializeUserSettings(this.getDefaultSettings());
  }

  static updateUserSettings(newUserSettings: UserSettingsTypes): boolean {
    return window.api.storage.updateUserSettings(newUserSettings);
  }

  static getUserSettings(): UserSettingsTypes {
    return window.api.storage.retrieveUserSettings();
  }
}
