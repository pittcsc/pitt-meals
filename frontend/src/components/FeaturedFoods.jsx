import React from "react"
import mockData from "../../mockData/featuredFoods.json"
import { useState } from "react";


const FeaturedFoods = () => {

    //TODO: Derin
    // This component displays a list of featured groups of foods that users select(high-protein, high-carb, high-fiber, etc.)
    // For now, you will read in some mock data that will match the form of the actual data and use that to generate the list
    // Each group should only show the top three foods, but users should be able to expand the list to show more

  
  return (<>
  <div>
    <ListFoods title="High Protein" data = {mockData} feature={'protein'}></ListFoods>
    <ListFoods title="High Carb" data = {mockData} feature={'carbs'}></ListFoods>
    <ListFoods title="High Fiber" data = {mockData} feature={'fiber'}></ListFoods>
    <ListFoods title="High Calorie" data = {mockData} feature={'calories'}></ListFoods>
  </div>
</>)


}

const ListFoods = ({title, data, feature}) => {
  const [showMore, setShowMore] = useState(false)
  const sortedList = Object.entries(data).sort(([, a], [, b]) => b?.[feature] - a?.[feature])
    return(<>
      <h1>{title}</h1>
      <ul>
        {showMore ?
          sortedList.map(([food, info]) => 
          (
            <li><h2>{food}: {info?.[feature]}</h2></li>)
          ) :
          sortedList.slice(0,3).map(([food, info]) => 
          (
            <li><h2>{food}: {info?.[feature]}</h2></li>)
          )
        }
        <button id="show-more" onClick={() => setShowMore(showMore => !showMore)}>{showMore ? "↑" : "↓"}</button>
      </ul>
    </>
    )
}


export default FeaturedFoods