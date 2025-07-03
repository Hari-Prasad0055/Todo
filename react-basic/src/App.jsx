
import Todo from './todo.jsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Homepage from './Homepage.jsx';
import Loginpage from './Loginpage.jsx';
import PagenotFound from './PagenotFound.jsx';



function App() {
   return (
     
         <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/todo' element= {<Todo />} />
                <Route path='/login' element={<Loginpage />} />
                <Route path='*' element={<PagenotFound/>} />
            </Routes>
          </BrowserRouter>
      
   );
}

export default App
