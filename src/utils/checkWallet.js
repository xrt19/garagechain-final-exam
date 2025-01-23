// export const checkWalletConnection = async () => {
//     if (!window.ethereum) {
//         alert('MetaMask is not installed!');
//         return false;
//     }

//     const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//     if (accounts.length === 0) {
//         alert('Please connect your wallet to continue.');
//         return false;
//     }

//     return true;
// };


export const checkWalletConnection = async () => {
    if (!window.ethereum) {
        alert('MetaMask is not installed!');
        console.error('MetaMask not installed');
        return false;
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        console.log('Connected accounts:', accounts);

        if (accounts.length === 0) {
            alert('Please connect your wallet to continue.');

            // Redirect untuk login MetaMask
            console.log('Requesting MetaMask login...');
            const newAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (newAccounts.length > 0) {
                console.log('Wallet connected:', newAccounts[0]);
                return true; // Koneksi berhasil
            } else {
                console.error('User denied wallet connection');
                return false; // User menolak koneksi
            }
        }

        return true; // Wallet sudah terkoneksi
    } catch (error) {
        console.error('Error checking wallet connection:', error);
        alert('Failed to check wallet connection');
        return false;
    }
};
