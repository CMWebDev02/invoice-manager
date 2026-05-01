import { Input } from '@base-ui/react';
import FlexColContainer from '@renderer/components/ui/flex-col-container';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import { convertCamelCase } from '@renderer/lib/utils';
import type { ChangeEvent } from 'react';

interface SettingOptionNumProps {
  settingName: string;
  settingValue: number;
  updateUserSetting: (settingName: string, settingValue: boolean | number) => void;
}

export default function SettingOptionNum({ settingName, settingValue, updateUserSetting }: SettingOptionNumProps): React.JSX.Element {
  const settingsTitle = convertCamelCase(settingName);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const newNumberValue = parseInt(e.currentTarget.value);
    if (newNumberValue > 0) {
      updateUserSetting(settingName, newNumberValue);
    }
  }

  return (
    <FlexRowContainer className="w-full h-16 justify-between items-center border border-foreground">
      <p className="text-3xl h-full p-2">{settingsTitle}</p>
      <FlexColContainer className="w-16 h-full items-center gap-1 border-l border-foreground p-2">
        <Input className="w-full h-full bg-primary rounded-xl p-1 text-center border border-foreground" type="number" onChange={handleChange} value={settingValue} id={settingName} />
      </FlexColContainer>
    </FlexRowContainer>
  );
}
