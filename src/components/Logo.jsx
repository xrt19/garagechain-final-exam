import React from 'react';

const Logo = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.mainText}>GarageChain</h1>
      <p style={styles.subText}>CARS YOU CAN TRUST</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: "'Arial', sans-serif",
  },
  mainText: {
    fontSize: '40px',
    fontWeight: 'bold',
    margin: 0,
    color: '#7F378A',
  },
  subText: {
    fontSize: '18px',
    margin: 0,
    color: '#7F378A',
    // letterSpacing: '1px',
  },
};

export default Logo;
