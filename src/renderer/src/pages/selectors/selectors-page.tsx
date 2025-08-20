import { Button } from '@renderer/components/ui/button';
import { Card, CardContent, CardFooter } from '@renderer/components/ui/card';
import { Dialog, DialogTrigger } from '@renderer/components/ui/dialog';
import ButtonLink from '@renderer/components/user/button-link';
import { getUserSaveData } from '@renderer/lib/utils';
import { useState } from 'react';
import SortersModal from './components/sorters-modal';
import ViewersModal from './components/viewers-modal';
import { buttonVariants } from '@renderer/components/ui/button';

interface SelectorsPageProps {
  selectorType: 'sorters' | 'viewers';
}

export default function SelectorsPage({ selectorType }: SelectorsPageProps): React.JSX.Element {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const savedSorters = getUserSaveData(selectorType);

  const toggleEditingMode = (): void => setEditingMode(!editingMode);

  const SortersButtons = savedSorters.map((sorterName) => {
    return (
      <div key={sorterName} className="bg-primary">
        {editingMode && <DialogTrigger className={buttonVariants({ variant: 'default' })}>^</DialogTrigger>}
        <Button disabled={editingMode}>{sorterName}</Button>
        {editingMode && <DialogTrigger className={buttonVariants({ variant: 'destructive' })}>X</DialogTrigger>}
      </div>
    );
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-6">
      <Dialog>
        {selectorType === 'sorters' ? <SortersModal /> : <ViewersModal />}
        <Card className="w-1/2 p-2 h-1/4 max-h-1/4">
          <CardContent className="flex flex-col items-center gap-2">{SortersButtons}</CardContent>
          <CardFooter></CardFooter>
        </Card>
        <div className="flex flex-row justify-between w-1/3">
          {editingMode ? (
            <>
              <Button onClick={toggleEditingMode}>Save</Button>
              <DialogTrigger className={buttonVariants({ variant: 'default' })}>New</DialogTrigger>
            </>
          ) : (
            <>
              <ButtonLink linkHref="/">Return</ButtonLink>
              <Button onClick={toggleEditingMode}>Edit</Button>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
}
