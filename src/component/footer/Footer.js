// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p style={{ fontSize: '16px' }}>contact us: {emailAddress}</p>
      <p style={{ fontSize: '10px' }}>{companyName} &copy; {new Date().getFullYear()} </p>

      
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#15191d',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  position: 'absolute',
  
  width: '100%',
};

const companyName = 'Galeria LLC';
const emailAddress = 'galeria3943@gmail.com';

export default Footer;
