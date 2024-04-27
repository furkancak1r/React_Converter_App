import React, { useCallback } from 'react';
import { useFileConversion } from '../../contextAPI/fileConversionContext';
import { useFileUpload } from '../../contextAPI/fileUploadContext';
import { toast } from 'react-toastify';
import { fileTypes } from '../constants/constants';
import { jpegToPngApi } from '../../api/jpegToPngApi';
import { pngToJpegApi } from '../../api/pngToJpegApi';

const UserUpload = () => {
  const { conversions } = useFileConversion();
  const { setUploadedFile, setUploadedFiles } = useFileUpload();
  const acceptType = fileTypes[conversions.current.from];

  const handleConversion = useCallback(async (file) => {
    try {
      if (!file) {
        toast.error('File not uploaded.');
        return;
      }

      let response;
      if (conversions.current.from === 'JPEG' && conversions.current.to === 'PNG') {
        response = await jpegToPngApi(file);
      } else if (conversions.current.from === 'PNG' && conversions.current.to === 'JPEG') {
        response = await pngToJpegApi(file);
      }

      if (response) {
        const blob = new Blob([response]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${file.name.split('.').slice(0, -1).join('.')}.${conversions.current.to.toLowerCase()}`);
        document.body.appendChild(link);
        link.click();
      }
    } catch (error) {
      toast.error('Error during conversion.');
    }
    // eslint-disable-next-line
  }, [conversions.current.from, conversions.current.to]);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    const currentOption = conversions.options.find(
      option => option.from === conversions.current.from && option.to === conversions.current.to
    );

    if (currentOption.multipleAllowed && files.length > 1) {
      setUploadedFiles(files);
      toast.success('Multiple files uploaded successfully.');
      // Handle multiple file conversion
    } else if (!currentOption.multipleAllowed && files.length === 1) {
      setUploadedFile(files[0]);
      toast.success(`File successfully uploaded: ${files[0].name}`);
      await handleConversion(files[0]);
    } else {
      toast.error(`Invalid operation. Please upload only one ${conversions.current.from} file.`);
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-auto">
        <input
          type="file"
          id="fileInput"
          accept={acceptType}
          multiple={conversions.current.multipleAllowed}  // Dinamik olarak multiple özelliğini ayarla
          onChange={handleFileUpload}
          hidden
        />
        <label htmlFor="fileInput" className="btn btn-outline-dark">
          {`${conversions.current.from} File Upload`}
        </label>
      </div>
    </div>
  );
};

export default UserUpload;
