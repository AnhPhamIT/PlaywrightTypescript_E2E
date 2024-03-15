import React, { useState } from 'react';
import './App.css';
import Hello from './Hello'; 

const App = () => {
  const [showHello, setShowHello] = useState(false);
  const [backgroundColor, setBackgroundColor] = React.useState("#1abc9c")
  const handleMakeTurquoise = () => {
    setBackgroundColor("#1abc9c")
  }
  const handleMakeRed = () => {
    setBackgroundColor("#e74c3c")
  }
  const handleMakeYellow = () => {
    setBackgroundColor("#f1c40f")
    setShowHello(!showHello);
    
  }
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor }}>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {showHello && <Hello />}
        <p>
          Default collor is Turquoise; click on the buttons to change background collor
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <span>Current color: {backgroundColor}</span>
        <div className="btn-group-colors">
          <button onClick={handleMakeTurquoise}>Turquoise</button>
          <button onClick={handleMakeRed}>Red</button>
          <button onClick={handleMakeYellow}>Yellow</button>
        </div>
      </header>
    </div>
  );
}

export default App;