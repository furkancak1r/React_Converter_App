import axios from 'axios';


export const jpegToPdfApi = async (uploadedFiles) => {
    const formData = new FormData();
    // Add each file to the FormData object
    uploadedFiles.forEach(file => {
        formData.append('files', file);
    });

    try {
        const response = await axios({
            method: 'post',
            url: `${apiUrl}/convert/jpeg-to-pdf`,
            data: formData,
            responseType: 'json',
        });

        return response.data; // Return the blob containing the PDF file
    } catch (error) {
        console.error('Failed to convert JPEG to PDF:', error);
        throw new Error('Error converting JPEG to PDF'); // Provide a more user-friendly error message
    }
};



const apiUrl = process.env.REACT_APP_API_URL; // Fetch the API URL from .env file

export const jpegToPngApi = async (uploadedFiles) => {
    const formData = new FormData();
    uploadedFiles.forEach(file => {
        formData.append('files', file);
    });

    try {
        const response = await axios({
            method: 'post',
            url: `${apiUrl}/convert/jpeg-to-png`,
            data: formData,
            responseType: 'json',
        });
        console.log("Full Axios response:", response); // Log the full response
        return response.data;
    } catch (error) {
        console.error("Error in API call:", error);
        throw error;
    }
};




export const pngToJpegApi = async (uploadedFiles) => {
    const formData = new FormData();
    // Add each file to the FormData object for batch processing
    uploadedFiles.forEach(file => {
        formData.append('files', file);
    });

    try {
        const response = await axios({
            method: 'post',
            url: `${apiUrl}/convert/png-to-jpeg`,
            data: formData,
            responseType: 'json',
        });

        return response.data; // Return the blob containing the converted JPEG files
    } catch (error) {
        console.error('Failed to convert PNG to JPEG:', error);
        throw new Error('Error converting PNG to JPEG'); // Provide a more user-friendly error message
    }
};
