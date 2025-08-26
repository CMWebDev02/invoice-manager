import { Button } from '@renderer/components/ui/button';
import { Card, CardContent } from '@renderer/components/ui/card';
import { Dialog, DialogTrigger } from '@renderer/components/ui/dialog';
import ButtonLink from '@renderer/components/user/button-link';
import { getUserSaveData } from '@renderer/lib/utils';
import { useState } from 'react';
import SortersModal from './components/sorters-modal';
import ViewersModal from './components/viewers-modal';
import { buttonVariants } from '@renderer/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SelectorsPageProps {
  selectorType: 'sorters' | 'viewers';
}

export default function SelectorsPage({ selectorType }: SelectorsPageProps): React.JSX.Element {
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const savedSorters = getUserSaveData(selectorType);

  const toggleEditingMode = (): void => setEditingMode(!editingMode);

  const SortersButtons = savedSorters.map((sorterName) => {
    return (
      <div key={sorterName} className="bg-primary w-full flex flex-row justify-center">
        {editingMode && <DialogTrigger className={buttonVariants({ variant: 'default' }) + ' w-1/6'}></DialogTrigger>}
        <Button
          disabled={editingMode}
          className="
        w-4/6
        "
        >
          {sorterName}
        </Button>
        {editingMode && (
          <DialogTrigger className={buttonVariants({ variant: 'destructive' }) + ' w-1/6'}>
            <FontAwesomeIcon icon={byPrefixAndName.fas['xmark']} />
          </DialogTrigger>
        )}
      </div>
    );
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-6">
      <Dialog>
        {/* Modal for the associated selector */}
        {selectorType === 'sorters' ? <SortersModal /> : <ViewersModal />}

        {/* Main card displayed on the page */}
        <Card
          className="bg-secondary p-2 h-1/4 max-h-1/4
          w-78
          md:w-86
          lg:w-96
        "
        >
          <CardContent
            className="flex flex-col items-center h-full max-h-full overflow-x-hidden overflow-y-auto scrollbar border-2 border-background p-0
        "
          >
            {SortersButtons}
          </CardContent>
        </Card>

        {/* Container for the buttons on the page */}
        <div
          className="flex flex-row justify-between 
        w-78
      md:w-86
      lg:w-96"
        >
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
