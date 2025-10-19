import { Button } from '@renderer/components/ui/button';
import { Card, CardContent } from '@renderer/components/ui/card';
import { Dialog, DialogTrigger } from '@renderer/components/ui/dialog';
import ButtonLink from '@renderer/components/user/button-link';
import { getAllDrives } from '@renderer/lib/utils';
import { useEffect, useState } from 'react';
import SortersModal from './components/sorters-modal';
import ViewersModal from './components/viewers-modal';
import { buttonVariants } from '@renderer/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { getSelectors } from '@renderer/lib/store';

interface SelectorsPageProps {
  selectorType: 'sorters' | 'viewers';
}

export default function SelectorsPage({ selectorType }: SelectorsPageProps): React.JSX.Element {
  const savedSorters = getSelectors(selectorType);
  const [drivesList, setDrivesList] = useState<string[]>([]);
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalClosed] = useState<boolean>(false);

  useEffect(() => {
    async function getUserDrives(): Promise<void> {
      const userDrives = await getAllDrives();
      setDrivesList(userDrives);
    }
    getUserDrives();
  }, []);

  const toggleEditingMode = (): void => setEditingMode(!editingMode);

  const toggleModal = (): void => setIsModalClosed(!isModalOpen);

  const SelectorsButtons = savedSorters.map(({ selectorTitle }) => {
    return (
      <div key={selectorTitle} className="bg-primary w-full flex flex-row justify-center p-1">
        {editingMode && (
          <Button className="w-1/6" onClick={toggleModal}>
            <FontAwesomeIcon icon={faAngleUp} size="lg" />
          </Button>
        )}
        <Button
          disabled={editingMode}
          className={`
            ${editingMode ? 'w-4/6' : 'w-full'}
            text-lg
            md:text-xl
            lg:text-2xl
            `}
        >
          {selectorTitle}
        </Button>
        {editingMode && (
          <Button variant="destructive" className="w-1/6">
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </Button>
        )}
      </div>
    );
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-6">
      <Dialog open={isModalOpen}>
        {/* Modal for the associated selector */}
        {selectorType === 'sorters' ? <SortersModal drivesList={drivesList} isOpen={isModalOpen} toggleModal={toggleModal} /> : <ViewersModal drivesList={drivesList} />}

        {/* Main card displayed on the page */}
        <Card
          className="bg-secondary p-2 
          
          h-3/4 md:h-1/2
          max-h-3/4 md:max-h-1/2
          w-78 md:w-86 lg:w-96
        "
        >
          <CardContent
            className="flex flex-col items-center h-full max-h-full overflow-x-hidden overflow-y-auto scrollbar border-2 border-background p-0
        "
          >
            {SelectorsButtons}
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
              <Button className="w-1/6" onClick={toggleModal}>
                New
              </Button>
              <Button onClick={toggleEditingMode}>Save</Button>
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
