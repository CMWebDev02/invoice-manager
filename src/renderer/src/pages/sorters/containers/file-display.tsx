import { useEffect, useState } from 'react';

interface FileDisplayProps {
  currentInvoice: string;
}

export default function FileDisplay({ currentInvoice }: FileDisplayProps): React.JSX.Element {
  const [pdf, setPDF] = useState<string>('');

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
      const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });

      //? Returns a objectUrl that points towards the pdfBlob.
      return URL.createObjectURL(pdfBlob);
    }

    if (currentInvoice !== '') {
      const pdfUri = decodeBase64IntoBlob(currentInvoice);
      setPDF(pdfUri);
    }
  }, [currentInvoice]);

  return <div className="w-2/3 h-full p-2">{pdf !== '' ? <iframe className="bg-secondary w-full h-full" src={pdf} /> : <h1>Loading</h1>}</div>;
}
