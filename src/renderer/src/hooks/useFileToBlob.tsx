import type { FileExport } from '@renderer/lib/types';
import { useEffect, useState } from 'react';

type UseFileToBlob = {
  fileDataURL: string;
  fileType: string;
  isLoading: boolean;
  error: Error | null;
};

interface UseFileToBlobProps {
  invoiceFile: FileExport;
}

export default function useFileToBlob({ invoiceFile }: UseFileToBlobProps): UseFileToBlob {
  const [fileDataURL, setFileDataURL] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    function decodeBase64IntoBlob(fileString: string, fileType: string): void {
      try {
        setIsLoading(true);

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

        if (fileType === 'png') {
          pdfBlob = new Blob([arrayBuffer], { type: 'application/png' });
        } else if (fileType === 'pdf') {
          pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
        } else {
          // If an invalid file type is used returns an empty sting
          throw new Error('Invalid File Type');
        }

        //? Turns the file Data into a objectUrl that points towards the pdfBlob.
        setFileDataURL(URL.createObjectURL(pdfBlob));
        //? Updates the file type for the outcome
        setFileType(invoiceFile.fileType);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An Unknown Error had Occurred Converting File!'));
        }

        setFileDataURL('');
        setFileType('');
      } finally {
        setIsLoading(false);
      }
    }

    decodeBase64IntoBlob(invoiceFile.data, invoiceFile.fileType);
  }, [invoiceFile]);

  return { fileDataURL, fileType, isLoading, error };
}
