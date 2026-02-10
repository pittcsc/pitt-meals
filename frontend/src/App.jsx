import './App.css'
import { BrowserRouter } from 'react-router-dom'
import FeaturedFoods from './components/FeaturedFoods'
import FilterMenu from './components/FilteredMenu'

function App() {


  return <BrowserRouter>
    <Route path="/menu"></Route>
    <Route path="/featured-foods"></Route>
  </BrowserRouter>
    
  
}

export default App