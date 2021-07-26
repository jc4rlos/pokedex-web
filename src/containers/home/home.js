import React, {memo} from 'react';
import Footer from './components/footer/footer';
import Pokemon from './components/pokemon/pokemon';
import useGetPokemon from './hooks/use-get-pokemon';
import {generateRandomNumber} from '../../utils/number';
import LoadingOverlay from '../../components/loading-overlay/loading-overlay';
import useCatchPokemon from './hooks/use-catch-pokemon';
import './home.scss';

const Home = () => {
    const {pokemon, getPokemon, setPokemon, loading} = useGetPokemon();

    const {catchPokemon, loading: catchLoading} = useCatchPokemon();

    const handleOnGetPokemon = () => {
        getPokemon(generateRandomNumber(150));
    };

    const onFinishCapture = () => {
        setPokemon(null);
    };

    const handleOnCatchPokemon = () => {
        catchPokemon(pokemon);
        onFinishCapture();
    };

    return (
        <div className="home">
            <LoadingOverlay show={loading || catchLoading} />
            {pokemon && <Pokemon pokemon={pokemon} onFinishCapture={onFinishCapture} />}
            <Footer
                handleOnGetPokemon={handleOnGetPokemon}
                hasPokemon={!!pokemon}
                handleOnCatchPokemon={handleOnCatchPokemon}
            />
        </div>
    );
};

export default memo(Home);
