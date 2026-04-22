import LoadingIndicator from '../pages/loading-indicator';
import { FileExport } from '@renderer/lib/types';
import useFileToBlob from '@renderer/hooks/useFileToBlob';
import ErrorPage from '../pages/error-page';

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
    return <iframe className="w-full h-full" src={fileDataURL} aria-disabled={disabled} />;
  } else if (fileType === 'png') {
    return <img className="aspect-auto" src={fileDataURL} aria-disabled={disabled} />;
  } else {
    // Returns an indicator that the file type is not supported received.
    return <h2>Invalid File Type!</h2>;
  }
}
