import React from 'react'

const PokemonDetails = ({ pokemon, onClose }) => {
    return (
        <div className="pokemon-details">
          <button className="close-button" onClick={onClose}>Close</button>
          <h2>{pokemon.name} (#{pokemon.id})</h2>
          <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
          <p>Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base Experience: {pokemon.base_experience}</p>
          <h3>Stats:</h3>
          <ul>
            {pokemon.stats.map(stat => (
              <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
            ))}
          </ul>
        </div>
      )
    }
 

export default PokemonDetails