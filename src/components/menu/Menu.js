import React from "react";
import Button from "../button/button";
import'./menu.css'

const Menu = (props) => {

  console.log('menu')
  console.log(props)

  return (
    <>
      {Object.entries(props.items).map((item, index) => {
        return (
          <Button
            key={index}
            id={index}
            className={props.class}
            type='text'
            onClick={props.onClick}
            name={item[0]}
            price ={`  R$${item[1]}`} 
          >
            
          </Button>
        );
      })}
    </>
  );
};

export default Menu;
