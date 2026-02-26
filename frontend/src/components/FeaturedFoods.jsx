import React from "react"
import mockData from "../../mockData/featuredFoods.json"
import { useState } from "react";


const FeaturedFoods = () => {

    //TODO: Derin
    // This component displays a list of featured groups of foods that users select(high-protein, high-carb, high-fiber, etc.)
    // For now, you will read in some mock data that will match the form of the actual data and use that to generate the list
    // Each group should only show the top three foods, but users should be able to expand the list to show more

  
  return (<>
  <div style={{display:'flex', flexDirection:'column'}}>   
    <ListFoods title="High Protein" data = {mockData} feature={'protein'} unit={'g'}></ListFoods>
    <ListFoods title="High Carb" data = {mockData} feature={'carbs'} unit={'g'}></ListFoods>
    <ListFoods title="High Fiber" data = {mockData} feature={'fiber'} unit={'g'}></ListFoods>
    <ListFoods title="High Calorie" data = {mockData} feature={'calories'} unit={'kcal'}></ListFoods>
    </div>
</>)


}

const ListFoods = ({title, data, feature, unit}) => {
  const [showMore, setShowMore] = useState(false)
  const sortedList = Object.entries(data).sort(([, a], [, b]) => b?.[feature] - a?.[feature])
    return(
    <div style={{padding:30, borderRadius:50, backgroundColor:'#090D11', margin:50, minWidth:500}}>
      <h1 style={{paddingBottom:20}}>{title}</h1>
      <ul>
        {showMore ?
          sortedList.map(([food, info]) => 
          (
            <li><h2>{food}: {info?.[feature]} {unit}</h2></li>)
          ) :
          sortedList.slice(0,3).map(([food, info]) => 
          (
            <li><h2>{food}: {info?.[feature]} {unit}</h2></li>)
          )
        }
        <button style={{marginTop:20, fontWeight:'bold'}} id="show-more" onClick={() => setShowMore(showMore => !showMore)}>{showMore ? "↑" : "↓"}</button>
      </ul>
    </div>
    )
}


export default FeaturedFoods