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
  lineHeight: '0.9',
  fontFamily: 'arial',
} as CSSProperties;

const styles_2 = {
  position: 'absolute',
  top: '50px',
  left: '550px',
  width: '350px',
  height: '300px',
  color: '#999',
  fontSize: '25px',
  textAlign: 'justify',
} as CSSProperties;

const App: React.FC = () => {
  // obligatory!
  const [nmbToSolve, setNmbToSolve] = useState<number>(0);

  // ** testing purpose **
  useEffect(() => {
    console.log('🚀 -> number to solve: ', nmbToSolve);
  }, [nmbToSolve]);

  return (
    <div>
      <Mtext
        as={'catch'}
        style={styles_1}
        setNmbToSolve={setNmbToSolve}
        abbrText={'Warning text!!! Warning text!!! Warning text!!!'}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. <br />
        Ut enim ad minim veniam, quis nostrud <span>exercitation</span> ullamco
        laboris nisi ut aliquip ex ea commodo consequat. <br />
        <br />
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </Mtext>
      <Mtext
        as={'catch'}
        style={styles_2}
        setNmbToSolve={setNmbToSolve}
        abbrText={'Warning text!!! Warning text!!! Warning text!!!'}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor <span>incididunt</span> ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation <span>ullamco</span> laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
      </Mtext>
    </div>
  );
};

export default App;
