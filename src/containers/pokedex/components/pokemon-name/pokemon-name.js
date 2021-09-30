import React, {memo, useState} from 'react';
import LoadingOverlay from '../../../../components/loading-overlay/loading-overlay';
import {toTitleCase} from '../../../../utils/string';
import usePatchPokemonName from '../../hooks/use-patch-pokemon-name';

const PokemonName = ({pokemon}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [pokemonName, setPokemonName] = useState(pokemon.name);
    const {patchName, loading} = usePatchPokemonName();
    // const handleOnEdit = () => {
    //     setIsEdit(true);
    //     setPokemonName(pokemon.name);
    // };

    const handleOnChangeName = ({target}) => {
        setPokemonName(target.value);
    };
    const handleOnCancel = () => {
        setIsEdit(false);
    };
    const handleOnSaveName = () => {
        patchName({
            id: pokemon.id,
            name: pokemonName,
        });
        setIsEdit(false);
        window.location.reload();
    };
    return (
        <div>
            <LoadingOverlay show={loading} />
            {!isEdit && (
                <div className="pokemon-detail__name">
                    {toTitleCase(pokemon.name)}{' '}
                    {/* <img src={Pencil} alt="pencil" width="20" onClick={handleOnEdit} /> */}
                </div>
            )}
            {isEdit && (
                <div className="pokemon-detail__input-name">
                    <div className="mb-3 input-group">
                        <button
                            className="btn btn-danger"
                            type="button"
                            onClick={handleOnCancel}
                        >
                            X
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            maxLength="30"
                            value={pokemonName}
                            onChange={handleOnChangeName}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            disabled={!pokemonName}
                            onClick={handleOnSaveName}
                        >
                            Go
                        </button>
                    </div>
                </div>
            )}

            <div className="pokemon-detail__hp">
                {pokemon.hp} / {pokemon.hp} HP
            </div>
        </div>
    );
};

export default memo(PokemonName);
