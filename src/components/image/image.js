import React from './node_modules/react';

const Image = (props) => (
  <img src={props.src} alt={props.alt} className={props.class} />
)

export default Image;