import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FeaturedFoods from './components/FeaturedFoods'
import FilteredMenu from './components/FilteredMenu'

function App() {


  return <BrowserRouter>
    <Routes>
      <Route path="/filtered-menu" element={<FilteredMenu/>}></Route>
      <Route path="/featured-foods" element={<FeaturedFoods/>}></Route>
    </Routes>
  </BrowserRouter>
    
  
}

export default App