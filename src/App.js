import React from 'react'; //ponto de entrada da aplicação
import './App.css';
import Button from './components/Button'

function App() {
  return (
    <div className="App">
      <Button name="Olá" />
      <p>Bem vindos ao Burguer Queen</p>
    </div>
  );
}

export default App;
