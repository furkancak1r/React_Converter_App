import React from 'react';
import './home.css';
import ConversionTypes from '../conversionTypes/conversionTypes';
import UserUpload from '../userUpload/userUpload';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="container mt-5">
      <Link to="/home">
        <img src="logo_whitesmokebg.png" alt="Logo" id='logo' />
      </Link>
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="text-center main-title">Welcome to AI Converter Pro</h1>
          <p className="text-center description">Discover the simplicity of converting files with our intuitive tools.</p>
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <ConversionTypes />
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <div className="col-md-8">
          <UserUpload />

        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <p className="text-center description">
          Are you in need of a highly efficient and user-friendly solution for converting your images and documents across different formats? Look no further! Our advanced online conversion tool is specifically designed to meet your needs, providing seamless transformations between JPEG to PNG, PNG to JPEG, and JPEG to PDF. This service ensures that every file conversion maintains the utmost quality, making it ideal for professional photographers, graphic designers, businesses, and anyone who requires precise image and document management.
        </p>
        <p className="text-center description">
          Our tool not only delivers superior quality results but also offers flexibility in managing file compatibility and size, making it perfect for web development, printing, or personal storage. With a focus on ease of use, our platform allows you to convert files quickly and easily, without any need for in-depth technical knowledge. You can batch convert numerous files simultaneously, saving you time and effort in your busy schedule.
        </p>
        <p className="text-center description">
          Additionally, our conversion tool supports various adjustments such as resolution scaling and color management, providing you with full control over the final output of your images and documents. Whether you're preparing a presentation, optimizing images for your website, or archiving important documents, our converter ensures that you receive optimal results tailored to your specific requirements.
        </p>
        <p className="text-center description">
          Experience the convenience and reliability of our online converter today, and streamline your workflow with our expertly designed service. Convert your files with confidence, knowing that you're using one of the best tools available for maintaining the integrity and quality of your digital assets.
        </p></div>
      <div className="row justify-content-center mt-3 mb-5">
      <div className="col-6 text-center">
          <Link to="/frequently-asked-questions" className="text-center description" style={{ textDecoration: 'underline' }}>Frequently Asked Questions (FAQ)</Link>
        </div>
        <div className="col-6 text-center">
          <Link to="/privacy-policy" className="text-center description" style={{ textDecoration: 'underline' }}>Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
