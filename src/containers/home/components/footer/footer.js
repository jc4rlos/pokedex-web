import React, {memo} from 'react';
import {Pokeball, Cherry} from '../../../../assets/images/index';
import './footer.scss';

const Footer = ({handleOnSetCherry, hasPokemon, handleOnCatchPokemon}) => {
    return (
        <div className="footer">
            <div className="footer__container">
                <div
                    className="footer__pokemon"
                    role="presentation"
                    onClick={handleOnSetCherry}
                >
                    <img src={Cherry} alt="cherry" width="30" />
                </div>
                {hasPokemon && (
                    <div
                        className="footer__pokeball"
                        role="presentation"
                        onClick={handleOnCatchPokemon}
                    >
                        <img src={Pokeball} alt="pokeball" width="90" />
                    </div>
                )}
                {!hasPokemon && <div />}
            </div>
        </div>
    );
};

export default memo(Footer);
