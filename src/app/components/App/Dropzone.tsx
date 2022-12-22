import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {css} from '@emotion/react';

const baseStyle = css({
  padding: '20px',
  marginTop: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'all .24s ease-in-out',
  '&:hover,&:focus': {
    borderColor: '#2196f3',
    color: 'black'
  }
});

interface DropzoneProps {
  imagePreview: string;
  setImagePreview: (file: string) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({setImagePreview, imagePreview}) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
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
  }, [setImagePreview]);
  const {getRootProps, getInputProps} =
    useDropzone({onDrop});

  return (
    <section >
      <div {...getRootProps()} css={baseStyle}>
        <input {...getInputProps()}/>
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      <div css={css`margin-top: 20px;`}>
        {imagePreview !== '' &&
          <img css={css`max-width: 100%`} src={imagePreview} alt="img"/>
        }
      </div>
    </section>
  );
};

export {Dropzone};
