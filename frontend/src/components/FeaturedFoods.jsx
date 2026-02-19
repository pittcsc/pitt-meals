import React from "react"
import mockData from "../../mockData/featuredFoods.json"
import { useState } from "react";


const FeaturedFoods = () => {

    //TODO: Derin
    // This component displays a list of featured groups of foods that users select(high-protein, high-carb, high-fiber, etc.)
    // For now, you will read in some mock data that will match the form of the actual data and use that to generate the list
    // Each group should only show the top three foods, but users should be able to expand the list to show more

    
  const [showMoreProtein, setShowMoreProtein] = useState(false)
  const [showMoreCarbs, setShowMoreCarbs] = useState(false)
  const [showMoreFiber, setShowMoreFiber] = useState(false)
  const [showMoreCalories, setShowMoreCalories] = useState(false)

  const sortedProtein = Object.entries(mockData).sort(([, a], [, b]) => b.protein - a.protein)
  const sortedCarbs = Object.entries(mockData).sort(([, a], [, b]) => b.carbs - a.carbs)
  const sortedFiber = Object.entries(mockData).sort(([, a], [, b]) => b.fiber - a.fiber)
  const sortedCalories = Object.entries(mockData).sort(([, a], [, b]) => b.calories - a.calories)
  
  return (<>
  <div>
    <h1>High Protein</h1>   {/*create a component for each list*/}
    <ul>
      {showMoreProtein ?
        sortedProtein.map(([food, info]) => 
        (
          <li><h2>{food}: {info.protein}</h2></li>)
        ) :
        sortedProtein.slice(0,3).map(([food, info]) => 
        (
          <li><h2>{food}: {info.protein}</h2></li>)
        )
      }
      <button id="show-more-protein" onClick={() => setShowMoreProtein(showMoreProtein => !showMoreProtein)}>{showMoreProtein ? "↑" : "↓"}</button>
    </ul>

    <h1>High Carb</h1>
    <ul>
      {showMoreCarbs ?
        sortedCarbs.map(([food, info]) => 
        (
          <li><h2>{food}: {info.carbs}</h2></li>)
        ) :
        sortedCarbs.slice(0,3).map(([food, info]) => 
        (
          <li><h2>{food}: {info.carbs}</h2></li>)
        )
      }
      <button id="show-more-carbs" onClick={() => setShowMoreCarbs(showMoreCarbs => !showMoreCarbs)}>{showMoreCarbs ? "↑" : "↓"}</button>
    </ul>

    <h1>High Fiber</h1>
    <ul>
      {showMoreFiber ?
        sortedFiber.map(([food, info]) => 
        (
          <li><h2>{food}: {info.fiber}</h2></li>)
        ) :
        sortedFiber.slice(0,3).map(([food, info]) => 
        (
          <li><h2>{food}: {info.fiber}</h2></li>)
        )
      }
      <button id="show-more-fiber" onClick={() => setShowMoreFiber(showMoreFiber => !showMoreFiber)}>{showMoreFiber ? "↑" : "↓"}</button>
    </ul>

    <h1>High Calorie</h1>
    <ul>
      {showMoreCalories ?
        sortedCalories.map(([food, info]) => 
        (
          <li><h2>{food}: {info.calories}</h2></li>)
        ) :
        sortedCalories.slice(0,3).map(([food, info]) => 
        (
          <li><h2>{food}: {info.calories}</h2></li>)
        )
      }
      <button id="show-more-calories" onClick={() => setShowMoreCalories(showMoreCalories => !showMoreCalories)}>{showMoreCalories ? "↑" : "↓"}</button>
    </ul>
  </div>
</>)
}


export default FeaturedFoods