import { Card, CardContent, CardFooter, CardTitle } from '@renderer/components/ui/card';
import ButtonLink from '@renderer/components/user/button-link';
import { UserSettings } from '@renderer/lib/user-settings';
import { useState } from 'react';
import { UserSettingsTypes } from '@renderer/lib/types';
import { toast, Toaster } from 'sonner';
import { Button, buttonVariants } from '@renderer/components/ui/button';
import FlexColContainer from '@renderer/components/ui/flex-col-container';
import SettingOptionBool from './components/setting-option-bool';
import SettingOptionNum from './components/setting-option-num';

export default function SettingsPage(): React.JSX.Element {
  const [userSettings, setUserSettings] = useState<UserSettingsTypes>(UserSettings.getUserSettings());

  function defaultSettings(): void {
    setUserSettings(UserSettings.getDefaultSettings());
    toast.success('Default Settings Applied! Remember to Save Changes!');
  }

  function saveSettings(): void {
    const isSaved = UserSettings.updateUserSettings(userSettings);
    if (isSaved) {
      toast.success('Saved Settings');
    } else {
      toast.success('Failed to Save Settings!');
    }
  }

  function updateUserSetting(settingName: string, newSettingValue: boolean | number): void {
    setUserSettings((prevSettings) => {
      const newSettings = { ...prevSettings };
      newSettings[settingName] = newSettingValue;
      return newSettings;
    });
  }

  const UserSettingsOptions = Object.entries(userSettings).map(([settingName, settingValue]) => {
    if (typeof settingValue === 'boolean') {
      return <SettingOptionBool key={settingName} settingName={settingName} settingValue={settingValue} updateUserSetting={updateUserSetting} />;
    } else {
      return <SettingOptionNum key={settingName} settingName={settingName} settingValue={settingValue} updateUserSetting={updateUserSetting} />;
    }
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-3/4 md:w-1/2 lg:w-1/3 h-3/4 bg-secondary border-2 border-foreground">
        <CardTitle className="w-full h-20 p-2 text-5xl text-foreground border-b border-foreground">Settings</CardTitle>
        <CardContent className="w-full h-[calc(100%-5rem-2.5rem)]">
          <FlexColContainer>{UserSettingsOptions}</FlexColContainer>
        </CardContent>
        <CardFooter className="w-full h-10 flex justify-between border-t border-foreground">
          <ButtonLink linkHref="/" className={buttonVariants({ variant: 'action', className: '' })}>
            Return
          </ButtonLink>
          <Button onClick={defaultSettings} variant={'action'} className="bg-primary">
            Defaults
          </Button>
          <Button onClick={saveSettings} variant={'action'} className="bg-primary">
            Save
          </Button>
        </CardFooter>
        <Toaster />
      </Card>
    </div>
  );
}
