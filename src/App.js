import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import PositionsList from './components/PositonsList';

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
      if (!candidateResponse.ok) {
        throw new Error('Error al obtener los datos del candidato.' + '\n' + candidateResponse.statusText);
      }
      const candidateData = await candidateResponse.json();
      console.log(candidateData);
      setCandidate(candidateData);

      const positionsUrl = process.env.REACT_APP_BASE_URL + `/api/jobs/get-list`;
      const positionsResponse = await fetch(positionsUrl);
      if (!positionsResponse.ok) {
        throw new Error('Error al obtener las posiciones disponibles.' + '\n' + positionsResponse.statusText);
      }
      const positionsData = await positionsResponse.json();
      console.log(positionsData);
      setDatos(positionsData);
      } catch (error) {
        alert(`Error: ${error.message}`);;
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
                  <p>Tu UUID es: {candidate.uuid}</p>
                  <p>Ya podés ver las posiciones disponibles abajo.</p>
                </div>
        )}
      </header>
      <PositionsList positions={datos} email={email} candidate={candidate} />
    </div>
    
  );
}

export default App;
