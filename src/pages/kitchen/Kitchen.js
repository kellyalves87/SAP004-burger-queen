import React from "react";
import firebase from "../../firebase-config";
import {Link} from 'react-router-dom'
import Button from '../../components/button/button';
import './Kitchen.css'
import logo from "../../assets/logo.svg";
import Image from '../../components/image/image'
import exit from "../../assets/exit.svg";


const Kitchen = () => {



  return (
    <div className='div-kitchen'>
      <nav className='nav-kitchen'>
        <figure className='figure-kitchen'>
          <Image src={logo} alt='logo' class='logo-kitchen' />
        </figure>
        <h1 className ='h1-kitchen'>BURGER QUEEN</h1>
        <Link to='/login' >
        <button
          className='button-exit'
          name='EXIT'
          onClick={() => firebase.auth().signOut()}
        >
          <Image src={exit} alt='exit' class='exit-image' />
        </button>
        </Link> 
      </nav>
      <section className='section-kitchen'>
        <div className='div-orderRecived'>
        <h1 className='h1-orders'>PEDIDOS PENDENTES</h1>
        </div>
        <div className='div-orderFinished'>
         <h1 className='h1-orders'>PEDIDOS PRONTOS</h1>
        </div>
      </section>
      
    
    </div> 
  );
};

export default Kitchen;
