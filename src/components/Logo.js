import React from 'react';
import './Logo.css';

const Logo = () => {
    return (
        <div className='logo-container'>
            <div className='logo-chars'>
                <h1 className='chars chars-O'>
                    O
                    <div className='compass-container'>
                        <span className="compass-icon">◆</span>
                        <span className='compass-dot'>.</span>
                    </div>
                </h1>
                <h1 className='chars chars-rient'>rient</h1>
                <h1 className='chars chars-AI'>AI</h1>
            </div>
        </div>
    );
};

export default Logo;
