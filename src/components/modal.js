import React from 'react';

const Modal =({children})=>{
  return <div className="modal">
    <div>
      <button className="close"></button>
<div className="content">{children}</div>
    </div>
  </div>
}
export default Modal