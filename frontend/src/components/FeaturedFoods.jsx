import React from "react"
import mockData from "../../mockData/featuredFoods.json"
import { useState } from "react";
import { motion } from "motion/react"
import breakfast from "../../../mock-data/breakfast.json"
//import * as motion from "motion/react-client"


const FeaturedFoods = () => {

    //TODO: Derin
    // This component displays a list of featured groups of foods that users select(high-protein, high-carb, high-fiber, etc.)
    // For now, you will read in some mock data that will match the form of the actual data and use that to generate the list
    // Each group should only show the top three foods, but users should be able to expand the list to show more

  
  return (<>
  <div style={{display:'flex', flexDirection:'column'}}>  
    <ListFoods title="High Protein" data = {breakfast.period.categories} feature={1}></ListFoods>
    <ListFoods title="High Carb" data = {breakfast.period.categories} feature={2}></ListFoods>
    <ListFoods title="High Fiber" data = {breakfast.period.categories} feature={7}></ListFoods>
    <ListFoods title="High Calorie" data = {breakfast.period.categories} feature={0}></ListFoods>
    </div>
</>)


}

const ListFoods = ({title, data, feature}) => {
  const [showMore, setShowMore] = useState(false)
  let sortedList = []
  for(let i = 0; i < 5; i++){
    sortedList = sortedList.concat(Object.entries(data[i].items))
  }
  sortedList.sort(([, a], [, b]) => b?.nutrients[[feature]].valueNumeric - a?.nutrients[[feature]].valueNumeric)

    return(

      /*I attempted to add animations via the motion library
      but couldn't get it to work:
      
      <motion.div whileHover={{scale:1.2}} style={{padding:30, borderRadius:50, backgroundColor:'#090D11', margin:50, minWidth:500}}>
      </motion.div>

      */
      

      <div class="shadow-lg border-5 border-transparent hover:border-solid hover:border-[#636ebb] hover:scale-125" style={{padding:30, borderRadius:50, backgroundColor:'#090D11', margin:50, minWidth:500}}>
        <h1 style={{paddingBottom:20}}>{title}</h1>
        <ul>
          {showMore ?
            sortedList.map(([food, info]) => 
            (
              <li style={{marginTop: 15}}><h2>{info.name}: {info.nutrients[[feature]].valueNumeric} {info.nutrients[[feature]].uom}</h2></li>)
            ) :
            sortedList.slice(0,3).map(([food, info]) => 
            (
              <li style={{marginTop: 15}}><h2>{info.name}: {info.nutrients[[feature]].valueNumeric} {info.nutrients[[feature]].uom}</h2></li>)
            )
          }
          <button style={{marginTop:20, fontWeight:'bold'}} id="show-more" onClick={() => setShowMore(showMore => !showMore)}>{showMore ? "↑" : "↓"}</button>
        </ul>
      </div>
    )
}


export default FeaturedFoods