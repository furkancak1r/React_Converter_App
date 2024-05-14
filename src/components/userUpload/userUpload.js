import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { debounce } from 'lodash'; // Make sure to install lodash for this to work
import { toast } from 'react-toastify';
import { useFileConversion } from '../../contextAPI/fileConversionContext';
import { useFileUpload } from '../../contextAPI/fileUploadContext';
import { jpegToPngApi, pngToJpegApi, jpegToPdfApi } from '../../api/api';
import { fileTypes } from '../constants/constants';
import { handleImageDownload, handlePdfDownload, handleValidation } from './userUploadHandlers';
import { useLoader } from '../../contextAPI/loaderContext'; // Use the loader context

const UserUpload = () => {
  const { conversions } = useFileConversion();
  const { setUploadedFiles } = useFileUpload();
  const { isLoading, startLoading, stopLoading } = useLoader(); // Use isLoading to track the upload state

  const handleFileUpload = useCallback(
    debounce(async (data) => {
      startLoading();
      const files = data.target ? Array.from(data.target.files) : data;

      const responseHandleValidation = handleValidation(data, conversions, fileTypes, stopLoading);
      if (!responseHandleValidation) {
        stopLoading();
        return;
      }

      try {
        let responseData;
        let extension;
        switch (`${conversions.current.from}_${conversions.current.to}`) {
          case 'JPEG_PNG':
            responseData = await jpegToPngApi(files);
            extension = 'png';
            handleImageDownload(responseData, extension);
            break;
          case 'PNG_JPEG':
            responseData = await pngToJpegApi(files);
            extension = 'jpeg';
            handleImageDownload(responseData, extension);
            break;
          case 'JPEG_PDF':
            responseData = await jpegToPdfApi(files);
            handlePdfDownload(responseData);
            break;
          default:
            toast.error("Invalid conversion type.");
            stopLoading();
            return;
        }
        setUploadedFiles(responseData);
        toast.success("Files uploaded and converted successfully.");
      } catch (error) {
        console.error('Error during file conversion:', error);
        toast.error(`Failed to convert files: ${error.message || error}`);
      }

      stopLoading();
    }, 300),
    [conversions, setUploadedFiles, startLoading, stopLoading]);

  const onDrop = useCallback(acceptedFiles => {
    handleFileUpload(acceptedFiles);
  }, [handleFileUpload]);

  const acceptType = fileTypes[conversions.current.from];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: true,
    noClick: true,
    noKeyboard: true,
    disabled: isLoading // Disable dropzone when isLoading is true
  });

  return (
    <div {...getRootProps()} className="upload-container mt-4" style={{ width: '100%', height: '150%', border: isDragActive && !isLoading ? '2px dashed green' : 'none' }}>
      <div className="row justify-content-center mt-4">
        <div className="col-3">

          <div className='row justify-content-center mt-4'>
            <input
              {...getInputProps({
                id: 'fileInput',
                onChange: (event) => handleFileUpload(event),
                style: { display: 'none' },
                disabled: isLoading // Disable input when isLoading is true
              })}
              accept={acceptType}
            />
            <label htmlFor="fileInput" className={`btn btn-outline-dark ${isLoading ? 'disabled' : ''}`} onClick={(event) => {
              event.preventDefault();
              if (!isLoading) document.getElementById('fileInput').click(); // Prevent click when isLoading
            }}>
              Upload {conversions.current.from} Files
            </label> </div> </div>
        <div className='row justify-content-center'>
          <div className='col-6'>
            <p className="text-center upload-instruction mt-4">Upload from button or drag and drop files here.</p>
          </div></div>

      </div>
      {isDragActive && !isLoading && ( // Show drop message only when not loading
        <p style={{ color: 'green', textAlign: 'center', position: 'absolute', top: '43%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Drop the files here...
        </p>
      )}
    </div>
  );
};

export default UserUpload;
