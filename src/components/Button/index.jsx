import React from 'react';
import './Button.scss';

const Button = ({ className, onClick, children }) => {
    return (
        <button className={`btn ${className}`} onClick={onClick ? () => onClick() : null}>
            {children}
        </button>
    )
}

export const OutlineButton = ({ className, onClick, children }) => {
    return (
        <Button className={`btn__outline ${className}`} onClick={onClick ? () => onClick() : null}>
            {children}
        </Button>
    );
}

export default Button;