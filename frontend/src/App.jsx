import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FeaturedFoods from './components/FeaturedFoods'
import FilteredMenu from './components/FilteredMenu'
import FilterMenu from './components/FilterMenu/FilterMenu'

function App() {


  return <BrowserRouter>
    <Routes>
      <Route path="/filtered-menu" element={<FilterMenu/>}></Route>
      <Route path="/featured-foods" element={<FeaturedFoods/>}></Route>
    </Routes>
  </BrowserRouter>
    
  
}

export default App