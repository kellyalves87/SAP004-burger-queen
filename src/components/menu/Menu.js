import React from "react";
import MenuItem from "./MenuItem";
import'./menu.css';


const Menu = (props) => {
  return (
    <> 
      {Object.entries(props.items).map((item) => {
        return (
          <MenuItem 
            key={item[0]}
            name={item[0]}        
            price={item[1]}
            handleClick={props.addItem}
            handleRemoveItem={props.removeItem}
            handleSubtractItem={props.subtractItem}
          />
        );
      })}
    </>
  );
};

export default Menu;
