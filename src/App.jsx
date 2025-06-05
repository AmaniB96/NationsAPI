import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Quizz from './pages/Quizz';
import Layout from './layout/Layout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="home/id" element={<Details/>}/>
          <Route path="quizz" element={<Quizz />} />

        </Route>
      </Routes>
  
    </BrowserRouter>
  )
}

export default App
