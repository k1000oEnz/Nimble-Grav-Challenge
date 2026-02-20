import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [candidate, setCandidate] = useState(null);
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if(!email) return alert('Por favor, introduzca un correo valido.');

    setLoading(true);
    try {
      } catch (error) {
      } finally {
        setLoading(false);
      } 
    }
  return (
    <div className="App">
      <body className="App-header">

      </body>
    </div>
  );
}

export default App;
