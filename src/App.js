import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', 
    {
      title: `Novo repositorio ${Date.now()}`,
      url: "http://github.com/", 
      techs: ["Node.js", "ReactJS"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204){
      const filteredRepositories = repositories.filter(repository => repository.id !== id);
      setRepositories(filteredRepositories);
    }
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
          {repositories.map(repository => 
              <li key={repository.id}>{repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
          )}
      </ul>

    </div>
  );
}

export default App;
