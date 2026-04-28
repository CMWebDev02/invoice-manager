import LoadingIndicator from '../pages/loading-indicator';
import { FileExport } from '@renderer/lib/types';
import useFileToBlob from '@renderer/hooks/useFileToBlob';
import ErrorPage from '../pages/error-page';
import FlexColContainer from '../ui/flex-col-container';
import FlexRowContainer from '../ui/flex-row-container';

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
        <FlexRowContainer className="w-full h-10 p-1 border border-foreground text-foreground bg-secondary lg:text-xl">
          <p className="w-20 lg:w-24 h-full select-none">File Name:</p>
          <p className="w-[calc(100%-5rem)] lg:w-[calc(100%-7rem)] h-full truncate">{invoiceFile.name}</p>
        </FlexRowContainer>
      </FlexColContainer>
    );
  } else if (fileType === 'png') {
    return <img className="aspect-auto" src={fileDataURL} aria-disabled={disabled} />;
  } else {
    // Returns an indicator that the file type is not supported.
    return <h2>Invalid File Type!</h2>;
  }
}
