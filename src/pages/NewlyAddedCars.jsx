import React from 'react';
import '../styles/NewlyAddedCars.css';
import { useCars } from '../context/CarContext';
import ethIcon from '../assets/eth-icon.png'; // Gambar ETH symbol
import { checkWalletConnection } from '../utils/checkWallet'; 

const NewlyAddedCars = () => {
  const { cars, setCars, addTransaction } = useCars(); // Gunakan setCars dari context

  const handleBuyNow = async (carId, price) => {
    const isWalletConnected = await checkWalletConnection();
        if (!isWalletConnected) return;
    if (!window.ethereum) {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const buyerAddress = accounts[0];

      // Simulasi pembelian
      alert(`Car ID: ${carId} purchased for ${price} ETH by ${buyerAddress}`);

      // Update status mobil menjadi "Sold"
      setCars((prevCars) =>
        prevCars.map((car) =>
          car.id === carId ? { ...car, status: 'Sold' } : car
        )
      );

      // Tambahkan transaksi
      addTransaction({
        carId,
        buyer: buyerAddress,
        status: 'PaymentReceived', // Status awal transaksi
      });
      
    } catch (error) {
      console.error('Failed to process purchase:', error);
      alert('Failed to complete purchase. Please try again.');
    }
  };

  // Filter hanya mobil yang tersedia
  const availableCars = cars.filter((car) => car.status === 'Available');

  return (
    <div className="newly-added-cars">
      <h2>Newly Added Cars</h2>
      <div className="car-list">
        {availableCars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={car.name} className="car-image" /> {/* Gambar Mobil */}
            <h4>{car.name}</h4>
            <p>{car.desc}</p>
            <p className="car-price">
              <img src={ethIcon} alt="ETH" className="eth-icon" /> {car.price}
            </p>
            <button className="buy-now-btn" onClick={() => handleBuyNow(car.id, car.price)}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewlyAddedCars;
