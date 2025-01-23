import React, { useState, useEffect } from 'react';
import '../styles/Welcome.css';
import metamaskLogo from '../assets/metamask-logo.png'; // Logo MetaMask

const Welcome = () => {
  const [walletAddress, setWalletAddress] = useState(null); // State untuk menyimpan address wallet

  // Function untuk menghubungkan wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]); // Simpan address wallet di state
        localStorage.setItem('walletAddress', accounts[0]); // Simpan address wallet ke Local Storage
        alert('Wallet connected successfully!');
      } catch (error) {
        alert('Failed to connect wallet. Please try again.');
        console.error(error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this feature.');
    }
  };

  // Function untuk logout wallet
  const logoutWallet = () => {
    setWalletAddress(null); // Reset state wallet
    localStorage.removeItem('walletAddress'); // Hapus data wallet dari Local Storage
    alert('Wallet disconnected.');
  };

  // Cek apakah wallet sudah terhubung saat komponen dimount
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  return (
    <div className="welcome-page">
      <h1>Welcome to GarageChain!</h1>
      <p>
        Find your next car with confidence at GarageChain. Our blockchain-powered platform ensures all records are verified and transparent. Get a clear look at each vehicle’s history, whether you’re buying or selling. Start exploring now!
      </p>
      <div className="connect-wallet-container">
        {walletAddress ? (
          <div>
            <button className="connect-wallet-btn">
              Connected ({walletAddress.slice(0, 6)}...{walletAddress.slice(-4)})
            </button>
            <button className="logout-btn" onClick={logoutWallet}>
              Log Out
            </button>
          </div>
        ) : (
          <button className="connect-wallet-btn" onClick={connectWallet}>
            Connect Wallet
            <img src={metamaskLogo} alt="MetaMask Logo" className="metamask-logo" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Welcome;


// import React, { useState, useEffect } from 'react';
// import '../styles/Welcome.css';
// import metamaskLogo from '../assets/metamask-logo.png'; // Logo MetaMask

// const Welcome = () => {
//   const [walletAddress, setWalletAddress] = useState(null); // State untuk menyimpan address wallet

//   // Function untuk menghubungkan wallet
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         setWalletAddress(accounts[0]); // Simpan address wallet di state
//         localStorage.setItem('walletAddress', accounts[0]); // Simpan address wallet ke Local Storage
//         alert(`Wallet connected successfully!`);
//       } catch (error) {
//         alert('Failed to connect wallet. Please try again.');
//         console.error(error);
//       }
//     } else {
//       alert('MetaMask is not installed. Please install it to use this feature.');
//     }
//   };

//   // Cek apakah wallet sudah terhubung saat komponen dimount
//   useEffect(() => {
//     const savedAddress = localStorage.getItem('walletAddress');
//     if (savedAddress) {
//       setWalletAddress(savedAddress);
//     }
//   }, []);

//   return (
//     <div className="welcome-page">
//       <h1>Welcome to GarageChain!</h1>
//       <p>
//         Find your next car with confidence at GarageChain. Our blockchain-powered platform ensures all records are verified and transparent. Get a clear look at each vehicle’s history, whether you’re buying or selling. Start exploring now!
//       </p>
//       <div className="connect-wallet-container">
//         {walletAddress ? (
//           <button className="connect-wallet-btn">
//             Connected ({walletAddress.slice(0, 6)}...{walletAddress.slice(-4)})
//           </button>
//         ) : (
//           <button className="connect-wallet-btn" onClick={connectWallet}>
//             Connect Wallet
//             <img src={metamaskLogo} alt="MetaMask Logo" className="metamask-logo" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Welcome;
