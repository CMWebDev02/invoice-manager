import { Button } from '@renderer/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@renderer/components/ui/card';
import ButtonLink from '@renderer/components/user/button-link';
import { getUserSaveData } from '@renderer/lib/utils';
import { useState } from 'react';

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
        {editingMode && <Button className="cursor-pointer">^</Button>}
        <Button disabled={editingMode} className="cursor-pointer">
          {sorterName}
        </Button>
        {editingMode && <Button className="cursor-pointer">X</Button>}
      </div>
    );
  });

  return (
    <Card>
      <CardTitle>This is the Sorters Page</CardTitle>

      <CardContent className="flex flex-col items-center gap-2">{SortersButtons}</CardContent>
      <CardFooter>
        {editingMode ? (
          <>
            <Button onClick={toggleEditingMode}>Save</Button>
            <Button>New</Button>
          </>
        ) : (
          <>
            <ButtonLink linkHref="/">Return</ButtonLink>
            <Button onClick={toggleEditingMode}>Edit</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
