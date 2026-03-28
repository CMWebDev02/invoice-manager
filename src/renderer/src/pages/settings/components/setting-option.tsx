import { Toggle } from '@renderer/components/ui/toggle';

interface SettingOptionProps {
  settingName: string;
  settingValue: boolean;
}

export default function SettingOption({ settingName, settingValue }: SettingOptionProps): React.JSX.Element {
  return (
    <div>
      <h1>{settingName}</h1>
      <Toggle variant={'outline'}>{settingValue === true ? 'True' : 'False'}</Toggle>
    </div>
  );
}
