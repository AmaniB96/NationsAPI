import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Quizz from './pages/Quizz';
import Layout from './layout/Layout'
import Details from './pages/Details';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="home" element={<Home/>}/>
          <Route path="/country/:name" element={<Details/>}/>
          <Route path="quizz" element={<Quizz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
