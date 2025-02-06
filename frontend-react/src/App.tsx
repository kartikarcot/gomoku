import React from 'react';
import './App.css';
import Board from './components/Board';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Gomoku</h1>
      <Board />
    </div>
  );
};

export default App; 