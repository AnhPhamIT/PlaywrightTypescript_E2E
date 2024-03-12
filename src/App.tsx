import React from 'react';
import './App.css';
//import logo from './logo.svg';
//const logo = require("./logo.svg") as string;

const App = () => {
  const [backgroundColor, setBackgroundColor] = React.useState("#1abc9c")
  const handleMakeTurquoise = () => {
    setBackgroundColor("#1abc9c")
  }
  const handleMakeRed = () => {
    setBackgroundColor("#e74c3c")
  }
  const handleMakeYellow = () => {
    setBackgroundColor("#f1c40f")
  }
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor }}>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Default collor is Turquoise; click on the buttons to change backgroup collor
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