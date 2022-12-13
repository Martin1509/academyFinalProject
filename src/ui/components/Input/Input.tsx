import React, {ChangeEventHandler} from 'react';

import './input.scss';

type Props = {
    className?: string;
    type?: string | undefined;
    value: string | number;
    onChange: ChangeEventHandler;
    [key: string]: any;
};

const Input = ({className = '', type, value, onChange, ...other}: Props) => (
  <input className={`input ${className}`} type={type} value={value} onChange={onChange} {...other}/>
);

export default Input;
