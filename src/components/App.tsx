import React, { useEffect, useState, CSSProperties } from 'react';
import './App.scss';
import Mtext from './Mtext';

const styles_1 = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  width: '350px',
  height: '300px',
  color: 'gray',
  fontSize: '20px',
  overflow: 'hidden',
  lineHeight: '1.5',
} as CSSProperties;

const styles_2 = {
  position: 'absolute',
  top: '50px',
  left: '550px',
  width: '350px',
  height: '300px',
  color: '#666',
  fontSize: '25px',
  overflow: 'hidden',
} as CSSProperties;

const App: React.FC = () => {
  return (
    <div>
      <Mtext as={'catch'} style={styles_1}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud <span>exercitation</span> ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Mtext>
      <Mtext as={'catch'} style={styles_2}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor <span>incididunt</span> ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Mtext>
    </div>
  );
};

export default App;
