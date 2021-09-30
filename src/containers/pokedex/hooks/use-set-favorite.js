import axios from 'axios';
import {useState} from 'react';
import {env} from '../../../constants/environment';
import Pokemon from '../../../models/pokemon';

const useSetFavorite = () => {
  const [pokemon, setPokemon] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const setFavorite = async (data) => {
    try {
      setLoading(true);
      const result = await axios.patch(
        `${env.POKEDEX_API_URL}pokemons/make-favorite/${data.id}`,
        data
      );
      setPokemon(new Pokemon({...result.data}));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {setFavorite, pokemon, loading, error};
};

export default useSetFavorite;
