import { Card, CardContent, CardFooter, CardTitle } from '@renderer/components/ui/card';
import ButtonLink from '@renderer/components/user/button-link';
import { UserSettings } from '@renderer/lib/user-settings';
import SettingOption from './components/setting-option';
import { useState } from 'react';
import { UserSettingsTypes } from '@renderer/lib/types';
import { toast, Toaster } from 'sonner';
import { Button } from '@renderer/components/ui/button';

export default function SettingsPage(): React.JSX.Element {
  const [userSettings, setUserSettings] = useState<UserSettingsTypes>(UserSettings.getUserSettings());

  function saveSettings(): void {
    const isSaved = UserSettings.updateUserSettings(userSettings);
    if (isSaved) {
      toast.success('Saved Settings');
    } else {
      toast.success('Failed to Save Settings!');
    }
  }

  function updateUserSetting(settingName: string, newSettingValue: boolean): void {
    setUserSettings((prevSettings) => {
      const newSettings = { ...prevSettings };
      newSettings[settingName] = newSettingValue;
      return newSettings;
    });
  }

  const UserSettingsOptions = Object.entries(userSettings).map(([settingName, settingValue]) => {
    return <SettingOption key={settingName} settingName={settingName} settingValue={settingValue} updateUserSetting={updateUserSetting} />;
  });

  return (
    <Card className="w-full h-full">
      <CardTitle className="w-full h-1/6">This is the Settings Page</CardTitle>
      <CardContent className="w-full h-4/6">
        <h1>{UserSettingsOptions}</h1>
      </CardContent>
      <CardFooter className="w-full h-1/6">
        <ButtonLink linkHref="/">Return</ButtonLink>
        <Button onClick={saveSettings}>Save</Button>
      </CardFooter>
      <Toaster />
    </Card>
  );
}
