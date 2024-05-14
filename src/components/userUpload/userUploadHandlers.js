import { toast } from 'react-toastify';

export const handleImageDownload = (files, extension) => {
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

export const handlePdfDownload = pdfData => {
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


export const handleValidation = (data, conversions, fileTypes, setIsUploading) => {
    const files = data.target ? Array.from(data.target.files) : data;
    if (files.length === 0) {
        toast.error("No files selected.");
        setIsUploading(false);
        return false;
    }

    const expectedFileType = fileTypes[conversions.current.from];
    const allFilesValid = files.every(file => file.type === expectedFileType);
    if (!allFilesValid) {
        toast.error(`Please upload only ${conversions.current.from} files.`);
        setIsUploading(false);
        return false;
    }


    return true;
}