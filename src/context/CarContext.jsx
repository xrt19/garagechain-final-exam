import React, { createContext, useState, useContext } from 'react';

// Initial data
const initialCars = [
  {
    id: 1,
    name: 'Hyundai Santa Fe',
    desc: '2.2 CRDi SIGNATURE AT (2022)',
    status: 'Available',
    price: '11.96',
    image: require('../assets/cars/santa-fe.png'), // Path gambar
    trackingNumber: null, 
  },
  {
    id: 2,
    name: 'Nissan Kicks',
    desc: '1.2 VL AT (2020)',
    status: 'Sold',
    price: '5.71',
    image: require('../assets/cars/kicks.png'),
    trackingNumber: null, 
  },
  {
    id: 3,
    name: 'Toyota Kijang Innova',
    desc: '2.0 Q AT (2023)',
    status: 'Cancelled',
    price: '8.78',
    image: require('../assets/cars/innova.png'),
    trackingNumber: null, 
  },
  {
    id: 4,
    name: 'Hyundai Palisade',
    desc: '2.2 Signature AT (2023)',
    status: 'Shipped',
    price: '19.64',
    image: require('../assets/cars/palisade.png'),
    trackingNumber: 'GRGCH-SHP-4', 
  },
];


// Context creation
const CarContext = createContext();

// Custom hook to use context
export const useCars = () => useContext(CarContext);

// Provider component
export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState(initialCars);
  const [transactions, setTransactions] = useState([]); // Tambahkan state untuk transaksi

  // Function to add a new car
  const addCar = (newCar) => {
    setCars([...cars, { ...newCar, id: cars.length + 1 }]);
  };

  // Fungsi untuk menambah transaksi baru
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <CarContext.Provider value={{ cars, setCars, addCar, transactions, addTransaction }}>
      {children}
    </CarContext.Provider>
  );
};
