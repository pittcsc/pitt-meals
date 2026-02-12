import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FeaturedFoods from './components/FeaturedFoods'
import FilterMenu from './components/FilteredMenu'

function App() {

{/* should this be using <Router> or <BrowserRouter>? (official docs use <BrowserRouter>) */}
  return <BrowserRouter>
      
      <Routes>
        <Route path="/menu" element={<FilterMenu/>}></Route>
        <Route path="/featured-foods" element={<FeaturedFoods/>}></Route> 
      </Routes>
  </BrowserRouter>
  
}

export default App