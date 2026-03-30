import { Switch } from '@renderer/components/ui/switch';
import { convertCamelCase } from '@renderer/lib/utils';

interface SettingOptionProps {
  settingName: string;
  settingValue: boolean;
  updateUserSetting: (settingName: string, settingValue: boolean) => void;
}

export default function SettingOption({ settingName, settingValue, updateUserSetting }: SettingOptionProps): React.JSX.Element {
  const settingsTitle = convertCamelCase(settingName);

  function handleChange(): void {
    updateUserSetting(settingName, !settingValue);
  }

  return (
    <div className="flex justify-between">
      <p>{settingsTitle}</p>
      <div>
        <label htmlFor={settingName}>{settingValue === true ? 'True' : 'False'}</label>
        <Switch onCheckedChange={handleChange} checked={settingValue} id={settingName} />
      </div>
    </div>
  );
}
