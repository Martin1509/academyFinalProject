import React from 'react';

import './button.scss';

type Props = {
    text: string;
    onClick();
    [key: string]: any;
};

const Button = ({text, onClick, ...other}: Props) => (
  <button onClick={onClick} {...other}>{text}</button>
);

export default Button;
