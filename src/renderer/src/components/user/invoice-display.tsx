import { useEffect, useState } from 'react';
import LoadingIndicator from '../pages/loading-indicator';
import FlexRowContainer from '../ui/flex-row-container';

interface InvoiceDisplayProps {
  disabled: boolean;
  invoiceFileData: string;
  invoiceFileType: string;
}

export default function InvoiceDisplay({ disabled, invoiceFileData, invoiceFileType }: InvoiceDisplayProps): React.JSX.Element {
  const [invoiceData, setInvoiceData] = useState<string>('');

  useEffect(() => {
    function decodeBase64IntoBlob(fileString: string): string {
      //? The atob method decodes the base64 string back to raw binary.
      const fileBinary = atob(fileString);
      //* A new array is constructed to create an array buffer.
      const arrayBuffer = new Uint8Array(fileBinary.length);

      //? The binary is iterated through and the associated index in the array buffer converts the binary value to an equivalent Unicode value.
      for (let i = 0; i <= fileBinary.length; i++) {
        arrayBuffer[i] = fileBinary.charCodeAt(i);
      }

      //? Constructs a blob out of the array buffer created from the buffer array.
      let pdfBlob: Blob;

      if (invoiceFileType === 'png') {
        pdfBlob = new Blob([arrayBuffer], { type: 'application/png' });
      } else if (invoiceFileType === 'pdf') {
        pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
      } else {
        // If an invalid file type is used returns an empty sting
        return '';
      }

      //? Returns a objectUrl that points towards the pdfBlob.
      return URL.createObjectURL(pdfBlob);
    }

    if (invoiceFileData !== '') {
      const pdfUri = decodeBase64IntoBlob(invoiceFileData);
      setInvoiceData(pdfUri);
    } else {
      setInvoiceData('');
    }
  }, [invoiceFileData, invoiceFileType]);

  const Invoice = (): React.JSX.Element => {
    if (invoiceFileType === 'png') {
      // Adds a div to allow the image to be centered within the display
      return (
        <div className="h-fit w-full">
          <img src={invoiceData} aria-disabled={disabled} className="aspect-auto" />
        </div>
      );
    } else if (invoiceFileType === 'pdf') {
      return (
        <div className="h-full w-full">
          <iframe src={invoiceData} aria-disabled={disabled} className="w-full h-full" />
        </div>
      );
    } else {
      // Returns empty element if invalid invoice file type is used
      return <></>;
    }
  };

  return <FlexRowContainer className="w-2/3 h-full items-center p-2">{invoiceData !== '' ? <Invoice /> : <LoadingIndicator />}</FlexRowContainer>;
}
