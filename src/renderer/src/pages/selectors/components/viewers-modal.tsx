import { Button } from '@renderer/components/ui/button';
import { DialogContent, DialogDescription, DialogHeader } from '@renderer/components/ui/dialog';
import { Input } from '@renderer/components/ui/input';
import { Label } from '@renderer/components/ui/label';

interface ViewersModalProps {
  drivesList: string[];
}

export default function ViewersModal({ drivesList }: ViewersModalProps): React.JSX.Element {
  return (
    <DialogContent>
      <DialogHeader>
        <Button>Save</Button>
      </DialogHeader>
      <DialogDescription>
        <div>
          <Label>Viewers Title</Label>
          <Input />
        </div>
        <div>
          <Label>Directories Destination</Label>
          <Input />
          <div>Directory Selector Goes Here</div>
        </div>
      </DialogDescription>
    </DialogContent>
  );
}
