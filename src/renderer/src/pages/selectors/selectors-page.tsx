import { Button } from '@renderer/components/ui/button';
import { Card, CardContent } from '@renderer/components/ui/card';
import { Dialog } from '@renderer/components/ui/dialog';
import ButtonLink from '@renderer/components/user/button-link';
import { getAllDrives } from '@renderer/lib/utils';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { getSelectors, removeSelector } from '@renderer/lib/store';
import SelectorsModal from './components/selectors-modal';
import { Link } from 'react-router';
import type { SelectorDetails } from '@renderer/lib/types';
import { Toaster } from 'sonner';

interface SelectorsPageProps {
  selectorType: 'sorters' | 'viewers';
}

export default function SelectorsPage({ selectorType }: SelectorsPageProps): React.JSX.Element {
  const [savedSorters, setSavedSorters] = useState<SelectorDetails[]>(getSelectors(selectorType));
  const [drivesList, setDrivesList] = useState<string[]>([]);
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalClosed] = useState<boolean>(false);
  const [currentSelectorId, setCurrentSelectorId] = useState<string>('');

  useEffect(() => {
    async function getUserDrives(): Promise<void> {
      const userDrives = await getAllDrives();
      setDrivesList(userDrives);
    }
    getUserDrives();
  }, []);

  const toggleEditingMode = (): void => setEditingMode(!editingMode);

  const toggleModal = (): void => {
    if (isModalOpen) {
      setCurrentSelectorId('');
    }
    setIsModalClosed(!isModalOpen);
    setSavedSorters(getSelectors(selectorType));
  };

  function editExistingSelector(selectorId: string): void {
    setCurrentSelectorId(selectorId);
    toggleModal();
  }

  function removeExistingSelector(selectorId: string): void {
    //TODO: Add confirmation popup
    console.log('create confirmation');
    const isSuccessful: boolean = removeSelector(selectorType, selectorId);
    if (isSuccessful) {
      setSavedSorters(getSelectors(selectorType));
    }
  }

  const SelectorsButtons = savedSorters.map(({ selectorTitle, selectorId }) => {
    return (
      <div key={selectorId} className="bg-primary w-full flex flex-row justify-center p-1">
        {editingMode && (
          <Button className="w-1/6" onClick={() => editExistingSelector(selectorId)}>
            <FontAwesomeIcon icon={faAngleUp} size="lg" />
          </Button>
        )}
        {/* Navigation link to respective sorter or viewer with selector id passed as a url parameter */}
        <Link to={`/${selectorType}/${selectorId}`}>
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
        </Link>
        {editingMode && (
          <Button variant="destructive" className="w-1/6" onClick={() => removeExistingSelector(selectorId)}>
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
        <SelectorsModal drivesList={drivesList} toggleModal={toggleModal} existingSelectorId={currentSelectorId} selectorType={selectorType} />

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
      <Toaster />
    </div>
  );
}
