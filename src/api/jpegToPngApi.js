import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL; // .env dosyasından URL'i alır

export const jpegToPngApi = async (uploadedFile) => {
  const formData = new FormData();
  formData.append('image', uploadedFile);

  try {
    const response = await axios({
      method: 'post',
      url: `${apiUrl}/convert/jpeg-to-png`,
      data: formData,
      responseType: 'blob', // Dönüştürülmüş dosyayı bir blob olarak almak için
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
