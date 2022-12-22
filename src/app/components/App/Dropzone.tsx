import React, {useCallback, useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import {css} from '@emotion/react';

const baseStyle = css({
  display: 'inline-block',
  maxWidth: '400px',
  padding: '20px',
  marginTop: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
});

// const focusedStyle = css({
//   //...baseStyle,
//   borderColor: '#2196f3'
// });

interface DropzoneProps {
  setFileSelected: (file: File | undefined) => void;
  setImagePreview: (file: string) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({setFileSelected, setImagePreview}) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {

        //const binaryStr = reader.result;
        if (file.type.includes('image')) {
          setImagePreview(readerEvent.target!.result as string);
        }
      };
      reader.readAsArrayBuffer(file);
      setFileSelected(file);
    });
  }, [setFileSelected, setImagePreview]);
  const {getRootProps, getInputProps} =
    useDropzone({onDrop});

  const style = useMemo(
    () => ({
      ...baseStyle
    }),
    []
  );

  return (
    <section >
      <div {...getRootProps()} css={style}>
        <input {...getInputProps()}/>
        <p>Drag & drop some files here, or click to select files</p>
      </div>
    </section>
  );
};

export {Dropzone};
