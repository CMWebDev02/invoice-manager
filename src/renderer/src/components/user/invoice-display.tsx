import LoadingIndicator from '../pages/loading-indicator';
import { FileExport } from '@renderer/lib/types';
import useFileToBlob from '@renderer/hooks/useFileToBlob';
import ErrorPage from '../pages/error-page';
import FlexColContainer from '../ui/flex-col-container';
import FileNameDisplay from './file-name-display';

interface InvoiceDisplayProps {
  disabled: boolean;
  invoiceFile: FileExport;
}

export default function InvoiceDisplay({ disabled, invoiceFile }: InvoiceDisplayProps): React.JSX.Element {
  const { fileDataURL, fileType, isLoading, error } = useFileToBlob({ invoiceFile });

  if (error) {
    return <ErrorPage errors={[error]} />;
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (fileType === '') {
    // Returns an indicator that there is no file currently selected
    return <h2>No File Selected!</h2>;
  } else if (fileType === 'pdf') {
    return (
      <FlexColContainer className="w-full h-full gap-2">
        <iframe className="w-full h-[calc(100%-3rem)]" src={fileDataURL} aria-disabled={disabled} />
        <FileNameDisplay fileName={invoiceFile.name} />
      </FlexColContainer>
    );
  } else if (fileType === 'png') {
    return (
      <FlexColContainer className="w-full h-full gap-2">
        <div className="w-full h-[calc(100%-3rem)]">
          <img className="aspect-auto" src={fileDataURL} aria-disabled={disabled} />
        </div>
        <FileNameDisplay fileName={invoiceFile.name} />
      </FlexColContainer>
    );
  } else {
    // Returns an indicator that the file type is not supported.
    return <h2>Invalid File Type!</h2>;
  }
}
