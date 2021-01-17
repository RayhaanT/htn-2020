import React from 'react';
import './home.css'
import Button from '@material-ui/core/Button';
import logo1 from '../Vaccine19Logo.png'
function Home() {
    return (
      <div>
          <header className="header">
            <h1>VACCINE-19 <Button variant="contained" color="primary">Sign Up For A Vaccine</Button></h1>
          </header>
          <body className="body1">
            <p >Making the distribution of </p>
            <p >vaccines simpler than ever. </p>
            <Button variant="contained" color="primary" size="large">View Heat Map Data</Button>
          </body>
          <body className='image'>
          <img src = {logo1} />
          </body>
      </div>
    );
  }
  
  export default Home;