import React from 'react';

const {useState} = React;

export default (initialState = '') => {
  const [value, setValue] = useState<string>(initialState);
  const setInputValue = e => setValue(e.target.value);

  return [value, setInputValue];
};
