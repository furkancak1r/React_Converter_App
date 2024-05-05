import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { debounce } from 'lodash'; // Make sure to install lodash for this to work
import { toast } from 'react-toastify';
import { useFileConversion } from '../../contextAPI/fileConversionContext';
import { useFileUpload } from '../../contextAPI/fileUploadContext';
import { jpegToPngApi, pngToJpegApi, jpegToPdfApi } from '../../api/api';
import { fileTypes } from '../constants/constants';

const UserUpload = () => {
  const { conversions } = useFileConversion();
  const { setUploadedFiles } = useFileUpload();
  const [isUploading, setIsUploading] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFileUpload = useCallback(debounce(async (data) => {
    if (isUploading) return;
    setIsUploading(true);

    const files = data.target ? Array.from(data.target.files) : data;
    if (files.length === 0) {
      toast.error("No files selected.");
      setIsUploading(false);
      return;
    }

    const expectedFileType = fileTypes[conversions.current.from];
    const allFilesValid = files.every(file => file.type === expectedFileType);
    if (!allFilesValid) {
      toast.error(`Please upload only ${conversions.current.from} files.`);
      setIsUploading(false);
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
          setIsUploading(false);
          return;
      }
      setUploadedFiles(responseData);

      toast.success("Files uploaded and converted successfully.");
    } catch (error) {
      console.error('Error during file conversion:', error);
      toast.error(`Failed to convert files: ${error.message || error}`);
    }

    setIsUploading(false);
  }, 300
  ), [conversions, setUploadedFiles, isUploading]);
  const handleImageDownload = (files, extension) => {
    files.forEach((file, index) => {
      const arrayBuffer = new Uint8Array(file.data).buffer;
      const blob = new Blob([arrayBuffer], { type: `image/${extension}` });  // Dinamik MIME tipi
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted-file-${index + 1}.${extension}`;  // Dinamik dosya uzantısı
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  };


  const handlePdfDownload = pdfData => {
    const arrayBuffer = new Uint8Array(pdfData[0].data).buffer;
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `converted-file-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    noKeyboard: true
  });

  return (
    <div {...getRootProps()} className="upload-container" style={{ width: '100%', height: '100vh', border: isDragActive ? '2px dashed green' : 'none' }}>
      <div className="row justify-content-center mt-4">
        <div className="col-auto">
          <input
            {...getInputProps({
              id: 'fileInput',
              onChange: (event) => handleFileUpload(event),
              style: { display: 'none' }
            })}
            accept={acceptType}
          />
          <label htmlFor="fileInput" className="btn btn-outline-dark" onClick={(event) => {
            event.preventDefault();
            if (!isUploading) document.getElementById('fileInput').click();
          }}>
            Upload {conversions.current.from} Files
          </label>
        </div>
      </div>
      {isDragActive && (
        <p style={{ color: 'green', textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Drop the files here...
        </p>
      )}
    </div>
  );
};

export default UserUpload;
