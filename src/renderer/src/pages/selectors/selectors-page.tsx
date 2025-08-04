import { Button } from '@renderer/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@renderer/components/ui/card';
import { Dialog, DialogTrigger } from '@renderer/components/ui/dialog';
import ButtonLink from '@renderer/components/user/button-link';
import { getUserSaveData } from '@renderer/lib/utils';
import { useState } from 'react';
import SortersModal from './components/sorters-modal';
import ViewersModal from './components/viewers-modal';

interface SelectorsPageProps {
  selectorType: 'sorters' | 'viewers';
}

export default function SelectorsPage({ selectorType }: SelectorsPageProps): React.JSX.Element {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const savedSorters = getUserSaveData(selectorType);

  const toggleEditingMode = (): void => setEditingMode(!editingMode);

  const SortersButtons = savedSorters.map((sorterName) => {
    return (
      <div key={sorterName} className="bg-black">
        {editingMode && <DialogTrigger className="cursor-pointer">^</DialogTrigger>}
        <Button disabled={editingMode} className="cursor-pointer">
          {sorterName}
        </Button>
        {editingMode && <DialogTrigger className="cursor-pointer">X</DialogTrigger>}
      </div>
    );
  });

  return (
    <Dialog>
      {selectorType === 'sorters' ? <SortersModal /> : <ViewersModal />}
      <Card>
        <CardTitle>This is the Sorters Page</CardTitle>
        <CardContent className="flex flex-col items-center gap-2">{SortersButtons}</CardContent>
        <CardFooter>
          {editingMode ? (
            <>
              <Button onClick={toggleEditingMode}>Save</Button>
              <DialogTrigger>New</DialogTrigger>
            </>
          ) : (
            <>
              <ButtonLink linkHref="/">Return</ButtonLink>
              <Button onClick={toggleEditingMode}>Edit</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </Dialog>
  );
}
