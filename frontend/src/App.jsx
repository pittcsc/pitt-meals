import './App.css'
import { Router } from 'react-router-dom'
import FeaturedFoods from './components/FeaturedFoods'
import FilterMenu from './components/FilteredMenu'

function App() {


  return <Router>
    <Route path="/menu"></Route>
    <Route path="/featured-foods"></Route>
  </Router>
    
  
}

export default App