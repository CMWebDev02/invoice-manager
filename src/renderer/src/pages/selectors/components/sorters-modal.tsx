import { Button } from '@renderer/components/ui/button';
import { DialogContent, DialogDescription, DialogHeader } from '@renderer/components/ui/dialog';
import { Input } from '@renderer/components/ui/input';
import { Label } from '@renderer/components/ui/label';

export default function SortersModal(): React.JSX.Element {
  return (
    <DialogContent>
      <DialogHeader>
        <Button>Save</Button>
      </DialogHeader>
      <DialogDescription>
        <div>
          <Label>Sorter Title</Label>
          <Input />
        </div>
        <div>
          <Label>Invoices Destination</Label>
          <Input />
          <div>Directory Selector Goes Here</div>
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
