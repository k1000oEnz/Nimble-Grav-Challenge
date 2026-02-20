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

      //Nota: Guardo el url en un .env por qué es como yo lo haría en un proyecto real, para no exponer el url en el código.
      const candidateUrl = process.env.REACT_APP_BASE_URL + `/api/candidate/get-by-email?email=${email}`;
      const candidateResponse = await fetch(candidateUrl);
      const candidateData = await candidateResponse.json();
      console.log(candidateData);
      setCandidate(candidateData);

      const positionsUrl = process.env.REACT_APP_BASE_URL + `/api/jobs/get-list`;
      const positionsResponse = await fetch(positionsUrl);
      const positionsData = await positionsResponse.json();
      console.log(positionsData);
      setDatos(positionsData);
      } catch (error) {
        alert('Error al obtener los datos del candidato o las posiciones.');
      } finally {
        setLoading(false);
      } 
    }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Challenge Nimble Gravity - Camilo Enriquez</h1>

        <div className="input-container">
          <input 
            type="email" 
            placeholder="Ingrese el correo del postulante" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <button onClick={handleFetch} disabled={loading}>
            {loading ? 'Cargando...' : 'Obtener posiciones'}
          </button>
        </div>
        {candidate && (
                <div className="mensaje-bienvenida">
                  <h2>¡Bienvenido, {candidate.firstName}!</h2>
                  <p>Ya podés ver las posiciones disponibles abajo.</p>
                </div>
        )}
      </header>
    </div>
  );
}

export default App;
