import React, {memo, useEffect, useState} from 'react';
import Footer from './components/footer/footer';
import Pokemon from './components/pokemon/pokemon';
import useGetPokemon from './hooks/use-get-pokemon';
import LoadingOverlay from '../../components/loading-overlay/loading-overlay';
import useCatchPokemon from './hooks/use-catch-pokemon';
import {useHistory, useParams} from 'react-router-dom';
import {isCatchPokemon} from '../../utils/pokemon';
import './home.scss';

const Home = () => {
    const {id} = useParams();
    const history = useHistory();
    const [cherry, setCherry] = useState(false);
    const [captured, setCaptured] = useState(false);
    const [catchLoadingCherry, setCatchLoadingCherry] = useState(false);
    const {pokemon, getPokemon, loading} = useGetPokemon();
    const {catchPokemon, loading: catchLoading} = useCatchPokemon();

    const handleOnSetCherry = () => {
        setCatchLoadingCherry(true);
        setTimeout(() => {
            setCherry(true);
            setCatchLoadingCherry(false);
        }, 2000);
    };

    const onFinishCapture = () => {
        history.goBack();
    };

    const exitCapture = () => {
        setCaptured(true);
        setTimeout(() => {
            setCaptured(false);
            history.goBack();
        }, 2000);
    };

    const handleOnCatchPokemon = () => {
        const capture = isCatchPokemon();
        if (capture || cherry) {
            catchPokemon(pokemon);
            exitCapture();
        } else {
            setCatchLoadingCherry(true);
            setTimeout(() => {
                setCatchLoadingCherry(false);
            }, 2000);
        }
    };

    useEffect(() => {
        getPokemon(id);
    }, [id]);

    return (
        <div className="home">
            <LoadingOverlay show={loading || catchLoading || catchLoadingCherry} />
            {pokemon && (
                <Pokemon
                    pokemon={pokemon}
                    onFinishCapture={onFinishCapture}
                    captured={captured}
                />
            )}
            <Footer
                handleOnSetCherry={handleOnSetCherry}
                hasPokemon={!!pokemon}
                handleOnCatchPokemon={handleOnCatchPokemon}
            />
        </div>
    );
};

export default memo(Home);
