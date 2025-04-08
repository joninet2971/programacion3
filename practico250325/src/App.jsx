import { useState, useEffect } from 'react';

function App() {

  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setPokemon(data)
      })
  }, [])
console.log(pokemon)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {pokemon?.abilities?.map((item) => {
            return (
              <tr key={item.slot}>
                <td>{item.ability.name}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App