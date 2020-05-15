import React from 'react';
import './App.css';
import Search from './components/search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stock tweets
        </a>
      </header>
      <Search />
    </div>
  );
}

export default App;
