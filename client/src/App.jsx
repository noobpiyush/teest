
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { SubmissionForm } from "./pages/SubmissionForm"
import { SubmissionList } from "./pages/SubmissionList"

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element = {<SubmissionForm/>}/>
        <Route path = '/submissions/:username' element={<SubmissionList/>}/>
      </Routes>    
    </BrowserRouter>
    </>
  )
}

export default App
