// import React from 'react'; //ponto de entrada da aplicação
import React, {useState} from 'react'
import './App.css';
import Button from './components/Button'
import Modal from  './components/modal'

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div className="App">
      <button onClick={()=> setIsModalVisible(true)}>Oopen</button>
      {isModalVisible ? < Modal /> : null}
    </div>
  );
} 

export default App;
