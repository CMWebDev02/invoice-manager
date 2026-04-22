import FlexColContainer from '@renderer/components/ui/flex-col-container';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
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
    <FlexRowContainer className="w-full h-16 justify-between items-center border border-foreground">
      <p className="text-3xl h-full p-2">{settingsTitle}</p>
      <FlexColContainer className="w-16 h-full items-center gap-1 border-l border-foreground p-2">
        <Switch onCheckedChange={handleChange} checked={settingValue} id={settingName} />
        <label htmlFor={settingName} className="select-none">
          {settingValue === true ? 'True' : 'False'}
        </label>
      </FlexColContainer>
    </FlexRowContainer>
  );
}
