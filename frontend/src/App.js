import {Routes, Route} from 'react-router-dom';
import { About } from './components/about';
import Home from './components/home';
import LogIn from './components/login';
import { NoMatch } from './components/nomatch';
import SignUp from './components/signin';

function App(){
  return(
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='about' element={<About/>}></Route>
      <Route path='signup' element={<SignUp/>}></Route>
      <Route path='login' element={<LogIn/>}></Route>
      <Route path='*' element={<NoMatch/>}></Route>
    </Routes>
  );
}

export default App;