 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Header from './components/Header'
import About from './components/About';
import Home from './components/Home'
import Details from './components/DetailFilling/Details';
import Preview from './components/Preview';
import MyResumes from './components/MyResumes';



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
