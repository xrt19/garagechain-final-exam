import React, { useState, useRef } from 'react';
import '../styles/CreateNewListing.css';
import { useCars } from '../context/CarContext';
import { checkWalletConnection } from '../utils/checkWallet.js'; 

const CreateNewListing = () => {
  const { addCar } = useCars(); // Ambil fungsi untuk menambahkan data mobil
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    variant: '',
    year: '',
    price: '',
    image: null, // Tambahkan untuk menyimpan file gambar
  });
  const fileInputRef = useRef(null); // Ref untuk input file


  // Handle input change untuk text/number
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) }); // Simpan file image ke state
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cek wallet terlebih dahulu
    const isWalletConnected = await checkWalletConnection();
    if (!isWalletConnected) return;

    const newCar = {
      name: `${formData.brand} ${formData.model}`, // Gabungkan brand + model
      desc: `${formData.variant} (${formData.year})`, // Gabungkan variant + year
      price: formData.price,
      status: 'Available', // Default status untuk listing baru
      image: formData.image, // Tambahkan image
    };

    addCar(newCar); // Tambahkan data ke global state

    alert('New listing added successfully!'); // Alert sederhana

    setFormData({
      brand: '',
      model: '',
      variant: '',
      year: '',
      price: '',
      image: null, // Reset image
    });

    // Reset input file secara manual
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset value elemen input file
    }
  };

  return (
    <div className="create-new-listing">
      <h2>Create a New Listing</h2>
      <form className="listing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Brand: (Example: Toyota)</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter car brand"
            required
          />
        </div>
        <div className="form-group">
          <label>Model: (Corolla Cross)</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Enter car model"
            required
          />
        </div>
        <div className="form-group">
          <label>Variant: (1.8 Hybrid GR-S AT)</label>
          <input
            type="text"
            name="variant"
            value={formData.variant}
            onChange={handleChange}
            placeholder="Enter car variant"
            required
          />
        </div>
        <div className="form-group">
          <label>Year: (2023)</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter manufacturing year"
            required
          />
        </div>
        <div className="form-group">
          <label>Price (in ETH): (25)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>
        <div className="form-group">
          <label>Upload Image: </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        {formData.image && (
          <div className="image-preview">
            <p>Preview:</p>
            <img src={formData.image} alt="Car Preview" />
          </div>
        )}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default CreateNewListing;
