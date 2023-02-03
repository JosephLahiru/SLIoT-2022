import React from 'react';
import logo from './../images/logo.png';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
      <section className=''>

        <MDBContainer className='text-center text-md-start mt-4'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 mt-5'>
                <img src={logo} style={{'width':'40px'}} className='me-3'/>
                Team Metatron
              </h6>
              <p>
              Team Metatron is an AI startup that provides cutting-edge AI/ML services, as well as web, standalone, and mobile app development using Java, React, and Flutter.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 mt-5'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 mt-5'>Useful links</h6>
              <p>
                <a href='sliot.mtron.me/about' className='text-reset'>
                  About
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 mt-5'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                FACULTY OF TECHNOLOGY, UNIVERSITY OF RUHUNA.
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@mtron.me
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 94 71 911 9299
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: 
        <a className='text-reset fw-bold' href='https://mtron.me'>mtron.me</a>
      </div>
    </MDBFooter>
  );
}