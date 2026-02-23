import React, {useEffect, useState} from 'react';

export default function PositionsList({positions = [], email = '', candidate = null}) {
    const [values, setValues] = useState({});
    const [status, setStatus] = useState({});
    

    if (!positions || positions.length === 0) return <p>No hay posiciones disponibles.</p>;

    return (
        <ul className="positions-list">
            {positions.map((position, index) => {
                const title = typeof position === 'string' ? position : position.title || `Posición ${index + 1}`;
                const id = position && typeof position === 'object' ? position.id || index : index;

                const handleSubmit = async () => {
                    debugger;
                    if (!candidate) return alert('No se ha encontrado el candidato. Por favor, ingrese un correo válido y vuelva a intentarlo.');
                    const gitHubUrl = values[id] || '';
                    console.log(gitHubUrl);
                    if (!gitHubUrl) return alert('Por favor, ingrese la URL de su repositorio de GitHub.');
                    const body = {
                        uuid: candidate.uuid,
                        jobId: position.id || id,
                        candidateId: candidate.candidateId,
                        repoUrl: gitHubUrl,
                    };
                    console.log(body);

                    setStatus(prev => ({...prev, [id]: 'Enviando...'}));
                    try {
                        const endpoint = process.env.REACT_APP_BASE_URL + '/api/candidate/apply-to-job';
                        const res = await fetch(endpoint, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(body),
                        });
                        if (!res.ok) {
                            const errorData = await res.json();
                            throw new Error(errorData.message || 'Error al enviar la aplicación.')};
                        } catch (error) {
                            alert(`Error: ${error.message}`);
                            setStatus(prev => ({...prev, [id]: 'Error al enviar'}));
                        }
                    };

                return (
                    <li key={id} className="position-item">
                        <div className="position-title">{title}</div>

                        <div className="input-group">
                            <input
                                className="repo-input"
                                type="text"
                                value = {values[id] || ''}
                                onChange={(e) => setValues(prev => ({...prev, [id]: e.target.value}))}
                                placeholder="URL de tu repositorio de GitHub"
                            />
                            <button className="apply-button" onClick={handleSubmit} disabled={status[id] === 'Enviando...'}>
                                {status[id] === 'Enviando...' ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                        {status[id] && <div className="status-message">{status[id]}</div>}
                    </li>
                );
            })}
        </ul>
    );
}