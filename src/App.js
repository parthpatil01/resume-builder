 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Header from './Components/Header'
import About from './Components/About';
import Home from './Components/Home'
import Details from './Components/DetailFilling/Details';
import Preview from './Components/Preview';
import MyResumes from './Components/MyResumes';



function App() {

  return (

    <Router> 
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/about' element={<About/>}/>
          <Route path='/details' element={<Details/>}/>
          <Route path='/preview' element={<Preview/>}/>
          <Route path='/my-resumes' element={<MyResumes/>}/>
        </Routes>
      </div>

    </Router> 
  );
}

export default App;
