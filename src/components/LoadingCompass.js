import React from 'react';
import './LoadingCompass.css';

const LoadingCompass = () => {
    return (
        <div className='loadingCompass-container'>
            <div className='loadingCompass-chars'>
                <h1 className='chars chars-O'>
                    O
                    <div className='compass-container'>
                        <span className="compass-icon">◆</span>
                        <span className='compass-dot'>.</span>
                    </div>
                </h1>
            </div>
            <h2 className='loadingCompass-loading'>Carregando</h2>
        </div>
    );
};

export default LoadingCompass;