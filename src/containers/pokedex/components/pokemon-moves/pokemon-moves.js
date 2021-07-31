import React, {memo} from 'react';
import {POKEMON_COLOR_TYPES, POKEMON_TYPES} from '../../../../constants/pokemon-types';
import {toTitleCase} from '../../../../utils/string';
import './pokemon-moves.scss';

const PokemonMoves = ({moves}) => {
    return (
        <div className="pokemon-moves">
            <hr className="pokemon-detail__hr" />
            <div>
                {moves &&
                    moves.map((move) => {
                        return (
                            <div className="pokemon-moves__container" key={move.id}>
                                <img
                                    src={POKEMON_TYPES[move.type]}
                                    alt="type"
                                    width="20"
                                />
                                {toTitleCase(move.name)}
                                <div
                                    className="pokemon-moves__progress"
                                    style={{
                                        gridTemplateColumns: `repeat(${move.power},60px)`,
                                    }}
                                >
                                    {[...Array(move.power)].map((x) => (
                                        <div
                                            className="pokemon-moves__bar"
                                            key={x}
                                            style={{
                                                backgroundColor: `${
                                                    POKEMON_COLOR_TYPES[move.type]
                                                }`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
export default memo(PokemonMoves);
