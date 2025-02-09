import React from 'react';
import { MetaMaskProvider } from '@metamask/sdk-react';
// import icon from '../assets/logo192.png';

const MetamaskProvider = ({ children }) => {
    return (
        <>
            <MetaMaskProvider
                debug={true}
                sdkOptions={{
                    dappMetadata: {
                        name: 'Storage App',
                        url: window.location.host,
                    },
                }}
            >
                {children};
            </MetaMaskProvider>
        </>
    );
};

export default MetamaskProvider;