import React, { useCallback } from 'react';
import { useFileConversion } from '../../contextAPI/fileConversionContext';
import { useFileUpload } from '../../contextAPI/fileUploadContext';
import { toast } from 'react-toastify';
import { jpegToPngApi, pngToJpegApi, jpegToPdfApi } from '../../api/api';

const UserUpload = () => {
  const { conversions } = useFileConversion();
  const { setUploadedFiles } = useFileUpload();

  const handleFileUpload = useCallback(async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) {
      toast.error("No files selected.");
      return;
    }

    try {
      let responseData;
      switch (`${conversions.current.from}_${conversions.current.to}`) {
        case 'JPEG_PNG':
          responseData = await jpegToPngApi(files);
          if (Array.isArray(responseData)) {
            downloadFiles(responseData);
          } else {
            console.error('Expected an array but got:', responseData);
            return;
          }
          break;
        case 'PNG_JPEG':
          responseData = await pngToJpegApi(files);
          if (Array.isArray(responseData)) {
            downloadFiles(responseData);
          } else {
            console.error('Expected an array but got:', responseData);
            return;
          }
          break;
        case 'JPEG_PDF':
          responseData = await jpegToPdfApi(files);
          handlePdfDownload(responseData);
          break;
        default:
          toast.error("Invalid conversion type.");
          return;
      }

      console.log("API response data:", responseData);

      setUploadedFiles(responseData);
      toast.success("Files uploaded and converted successfully.");
    } catch (error) {
      console.error('Error during file conversion:', error);
      toast.error(`Failed to convert files: ${error.message || error}`);
    }
  }, [conversions, setUploadedFiles]);


  const handlePdfDownload = (pdfData) => {
    if (!pdfData || !pdfData[0] || !pdfData[0].data) {
      console.error('Invalid or empty PDF data:', pdfData);
      toast.error("PDF document could not be loaded.");
      return;
    }
  
    // Convert the received array data into a Uint8Array
    const arrayBuffer = new Uint8Array(pdfData[0].data).buffer;
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
  
    // Create a URL for the blob and initiate a download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `converted-file-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  
    console.log('PDF download initiated successfully.');
  };
  
  

  const downloadFiles = (files) => {
    if (!files || !Array.isArray(files)) {
      console.error('Invalid or empty files array:', files);
      return;
    }

    files.forEach((file, index) => {
      // Assuming file.data is an array containing the byte values
      const arrayBuffer = new Uint8Array(file.data).buffer;
      const blob = new Blob([arrayBuffer], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted-file-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  };



  const acceptType = `image/${conversions.current.from.toLowerCase()}`;

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-auto">
        <input
          type="file"
          id="fileInput"
          accept={acceptType}
          onChange={handleFileUpload}
          multiple
          hidden
        />
        <label htmlFor="fileInput" className="btn btn-outline-dark">
          Upload {conversions.current.from} Files
        </label>
      </div>
    </div>
  );
};

export default UserUpload;
