 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Resume from './components/Resume'
import ResumeTwo from './components/ResumeTwo'
import ResumeThree from './components/ResumeThree'
import ResumeFour from './components/ResumeFour'
import Header from './components/Header'
import Logo from './components/Logo';
import About from './components/About';
import Home from './components/Home'
import Details from './components/Details';
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
          <Route path='/logo' element={<Logo/>}/>
          
          
        </Routes>
      </div>

    </Router> 
  );
}

export default App;
