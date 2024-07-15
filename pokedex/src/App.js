import { useEffect, useState } from "react";
import PokemonThumnail from "./components/PokemonThumnail";
import './index.css';


function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  
  const getAllPokemons = async() =>{
    const res= await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)
    
    function createPokemonObject (result){
      result.forEach(async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemons((currentList) => {
          // Check if the Pokemon already exists in the list
          if (!currentList.some(p => p.id === data.id)) {
            return [...currentList, data]
          }
          return currentList
        })
        

       })

    }
    createPokemonObject(data.results)
    console.log(allPokemons)
  }
  const searchPokemon = async () => {
    if (searchQuery.trim() === '') {
      setSearchResult(null);
      return;
    }
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`)
      const data = await res.json()
      setSearchResult(data)
    } catch (error) {
      console.error('Error fetching Pokémon:', error)
      setSearchResult(null)
    }
  }

  useEffect(() =>{
    getAllPokemons()
   
  }, [])
  const sortedPokemons = allPokemons.sort((a, b) => a.id - b.id);

  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchPokemon}>Search</button>
      </div>
      <div className="pokemon-container">
        <div className="all-containers">
          {searchResult ? (
            <PokemonThumnail
              id={searchResult.id}
              name={searchResult.name}
              image={searchResult.sprites.other.dream_world.front_default}
              type={searchResult.types[0].type.name}
              key={searchResult.id}
            />
          ) : (
            sortedPokemons.map((pokemon, index) => (
            <PokemonThumnail
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other.dream_world.front_default}
            type={pokemon.types[0].type.name}
            key={index}
            />
            ))
          )}

        </div>
        {!searchResult && <button className="load-more" onClick={() => getAllPokemons()}>Load More</button>}

      </div>

    </div>
  )
}

export default App;
