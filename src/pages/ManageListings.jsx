import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import '../styles/ManageListings.css';
import ethIcon from '../assets/eth-icon.png'; // Gambar ETH symbol
import { checkWalletConnection } from '../utils/checkWallet'; 

const ManageListings = () => {
  const { cars, transactions, setTransactions, setCars } = useCars();
  const [trackingNumber, setTrackingNumber] = useState(''); // State untuk input tracking number

  // Fungsi untuk menentukan warna tombol berdasarkan status
  const getStatusButtonClass = (status) => {
    switch (status) {
      case 'Available':
        return 'btn-available';
      case 'Sold':
        return 'btn-sold';
      case 'Cancelled':
        return 'btn-cancelled';
      case 'Shipped':
        return 'btn-shipped';
      default:
        return '';
    }
  };

  // Fungsi untuk memproses shipping
  const handleProcessShipping = async (carId) => {
    const isWalletConnected = await checkWalletConnection();
        if (!isWalletConnected) return;
    const tracking = prompt('Enter Tracking/Shipping Number:');
    if (tracking) {
      setTrackingNumber(tracking);
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === carId ? { ...car, status: 'Shipped', trackingNumber: tracking } : car
        )
      );
      alert(`Tracking number ${tracking} has been added for Car ID: ${carId}`);
    }
  };

  // Fungsi untuk membatalkan transaksi
  const handleCancelTransaction = async (carId) => {
    const isWalletConnected = await checkWalletConnection();
        if (!isWalletConnected) return;
    const confirmCancel = window.confirm('Are you sure you want to cancel this transaction?');
    if (confirmCancel) {
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === carId ? { ...car, status: 'Cancelled' } : car
        )
      );
      alert(`Transaction for Car ID: ${carId} has been cancelled.`);
    }
  };

  // return (
  //   <div className="manage-listings">
  //     <h2>Manage All Listings</h2>
  //     <div className="car-list">
  //       {cars.map((car) => (
  //         <div key={car.id} className="car-card">
  //           <img src={car.image} alt={car.name} className="car-image" /> {/* Tambahkan Gambar */}
  //           <h4>{car.name}</h4>
  //           <p>{car.desc}</p>
  //           <p className="car-price">
  //             <img src={ethIcon} alt="ETH" className="eth-icon" /> {car.price}
  //           </p>
  //           <button className={`status-btn ${getStatusButtonClass(car.status)}`}>
  //             <strong>Status:</strong> {car.status}
  //           </button>
  //         </div>
  //       ))}
  //     </div>

  //   </div>
  // );
  
  return (
    <div className="manage-listings">
      <h2>Manage All Listings</h2>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.name} className="car-image" />
            <h4>{car.name}</h4>
            <p>{car.desc}</p>
            <p className="car-price">
              <img src={ethIcon} alt="ETH" className="eth-icon" /> {car.price}
            </p>
            <button className={`status-btn ${getStatusButtonClass(car.status)}`}>
              <strong>Status:</strong> {car.status}
            </button>
            {car.status === 'Sold' && (
              <div className="transaction-info">
                <p className="purchase-info">
                  This car has been purchased. Please process it immediately.
                </p>

                <button
                  className="process-shipping-btn"
                  onClick={() => handleProcessShipping(car.id)}
                >
                  Process Shipping
                </button>
                <button
                  className="cancel-transaction-btn"
                  onClick={() => handleCancelTransaction(car.id)}
                >
                  Cancel Transaction
                </button>
              </div>
            )}
            {car.status === 'Shipped' && (
              <p className="tracking-info">
                Tracking Number: <strong>{car.trackingNumber}</strong>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageListings;
