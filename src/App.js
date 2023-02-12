import React from 'react';
import './App.css';
import Grid from './component/grid/grid';
import Keyboard from './component/keyboard/keyboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          daridle
        </p>
      </header>
      <Grid />
      <Keyboard />
    </div>
  );
}

export default App;
