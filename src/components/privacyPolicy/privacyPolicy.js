import React from 'react';
import './privacyPolicy.css';

export function PrivacyPolicy() {
    return (
        <div className="privacyPolicy">
            <h1>Privacy Policy for AI Converter Pro</h1>
            <p><strong>Effective Date:</strong> 15-05-2024</p>
            <p>Welcome to AI Converter Pro, accessible from https://aiconverterpro.com. At AI Converter Pro, the privacy and security of our users are of paramount importance. This Privacy Policy outlines the types of information we do not collect, how we process your data during file conversions, and your privacy rights.</p>

            <h2>1. Information We Do Not Collect</h2>
            <p>AI Converter Pro is designed to be a safe, anonymous way to convert files without the need for personal information. Our service does not require registration, and we do not have the capability to store personal data. No user data is saved or stored on our servers beyond the temporary processing period needed for file conversions.</p>

            <h2>2. How We Process Files</h2>
            <ul>
                <li><strong>File Uploads:</strong> Users can upload files to our platform for conversion. These files are temporarily held in memory during the conversion process and are neither saved nor stored on our servers afterward.</li>
                <li><strong>Conversion Process:</strong> Our servers automatically process the uploaded files based on the conversion parameters selected by the user. After processing, the converted file is immediately made available to the user for download.</li>
                <li><strong>File Deletion:</strong> Uploaded and converted files are automatically deleted from our system immediately after the conversion process. They are not stored for any duration beyond what is necessary for the conversion to take place.</li>
            </ul>

            <h2>Log Files</h2>
            <p>AI Converter Pro follows a standard procedure of using log files.
            </p>
        </div>
    );
}
