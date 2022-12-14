import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Form} from './Form';

const App = () => {
  return (
    <>
      <AppRoutes/>
    </>
  );
};

function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Form/>}/>
      <Route path="*" element={<Form/>}/>
    </Routes>
  );
}

export default App;
