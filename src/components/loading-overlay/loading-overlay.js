import React, {memo} from 'react';
import {Loading} from '../../assets/images';
import './loading-overlay.scss';

const LoadingOverlay = ({show = false, message = 'Cargando...'}) => {
    return (
        <>
            {show && (
                <div className="loading-overlay">
                    <div className="loading-overlay__container">
                        <img src={Loading} alt="loading" />
                    </div>

                    <h6 className="text-center">{message}</h6>
                </div>
            )}
        </>
    );
};

export default memo(LoadingOverlay);
