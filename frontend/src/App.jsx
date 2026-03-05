import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FeaturedFoods from './components/FeaturedFoods'
import FilteredMenu from './components/FilteredMenu'

function App() {

<<<<<<< HEAD
{/* should this be using <Router> or <BrowserRouter>? (official docs use <BrowserRouter>) */}
  return <BrowserRouter>
      
      <Routes>
        <Route path="/menu" element={<FilteredMenu/>}></Route>
        <Route path="/featured-foods" element={<FeaturedFoods/>}></Route> 
      </Routes>
  </BrowserRouter>
=======

  return <BrowserRouter>
    <Routes>
      <Route path="/filtered-menu" element={<FilteredMenu/>}></Route>
      <Route path="/featured-foods" element={<FeaturedFoods/>}></Route>
    </Routes>
  </BrowserRouter>
    
>>>>>>> ca160fdd17cd28a6212f408334947961f941abfe
  
}

export default App