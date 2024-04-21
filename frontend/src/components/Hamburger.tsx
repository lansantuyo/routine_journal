import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Button = () => {
    return <button>Click me!</button>;
}

const Hamburger: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hamburger" onClick={handleClick}>
            <div className={`line ${isOpen ? 'open' : ''}`} />
            <div className={`line ${isOpen ? 'open' : ''}`} />
            <div className={`line ${isOpen ? 'open' : ''}`} />
            {isOpen && (
                <div className="rectangle">
                    {/* Content of the rectangle */}
                    <Link to="/home">Go to HomePage</Link>
                </div>
            )}
        </div>
    );
};

export default Hamburger;