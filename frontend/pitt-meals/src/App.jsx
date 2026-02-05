import './App.css'
import { Router } from 'react-browser-router'
import FeaturedFoods from './components/FeaturedFoods'
import FilterMenu from './components/FilterMenu'

function App() {


  return <Router>
    <Route path="/menu"></Route>
    <Route path="/featured-foods"></Route>
  </Router>
    
  
}

export default App
