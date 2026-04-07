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
  <h2 style={{fontWeight:'bold', fontSize:40}}>Featured Items</h2>
  <div style={{display:'flex', flexDirection:'column'}}>  
    <ListFoods title="High Protein" data = {breakfast.period.categories} feature={1} color1='#ddccff' color2='#bb99ff'></ListFoods>
    <ListFoods title="High Carb" data = {breakfast.period.categories} feature={2} color1='#ffcccc' color2='#ff9999'></ListFoods>
    <ListFoods title="High Fiber" data = {breakfast.period.categories} feature={7} color1='#fff5cc' color2='#ffeb99'></ListFoods>
    <ListFoods title="High Calorie" data = {breakfast.period.categories} feature={0} color1='#ccebff' color2='#99d6ff'></ListFoods>
    </div>
</>)


}

const ListFoods = ({title, data, feature, color1, color2}) => {
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
      

      //<div class="shadow-lg border-5 border-transparent hover:border-solid hover:border-[#636ebb]" style={{padding:30, borderRadius:50, backgroundColor:'#090D11', margin:50, minWidth:500}}>
        <>
        <h2 style={{display:'flex', alignContent:'flex-start'}}>{title}</h2>
        <ul>
          {showMore ?
            sortedList.slice(0,10).map(([food, info]) => 
            (
              //<li style={{marginTop: 15}}><h2>{info.name}: {info.nutrients[[feature]].valueNumeric} {info.nutrients[[feature]].uom}</h2></li>)
              <FoodItem
                name = {info.name}
                value = {info.nutrients[[feature]].valueNumeric}
                unit = {info.nutrients[[feature]].uom}
                nutrients = {info.nutrients}
                color1 = {color1}
                color2 = {color2}>
                </FoodItem>)
            ) :
            sortedList.slice(0,3).map(([food, info]) => 
            (
              //<li style={{marginTop: 15}}><h2>{info.name}: {info.nutrients[[feature]].valueNumeric} {info.nutrients[[feature]].uom}</h2></li>)
              <FoodItem
                name = {info.name}
                value = {info.nutrients[[feature]].valueNumeric}
                unit = {info.nutrients[[feature]].uom}
                nutrients = {info.nutrients}
                color1 = {color1}
                color2 = {color2}>
                </FoodItem>)
            )
          }
          <p style={{cursor:'pointer', marginBottom:0, fontSize:15, backgroundColor:'transparent'}} id="show-more" onClick={() => setShowMore(showMore => !showMore)}>{showMore ? "See Less" : "See More"}</p>
        </ul>
        </>
    )
}

const FoodItem = ({name, value, unit, nutrients, color1, color2}) => {
  const [moreInfo, setMoreInfo] = useState(false)
  return(
    <>
      <div onClick={() => setMoreInfo(moreInfo => !moreInfo)} className="border-3 hover:border-solid hover:shadow-lg" style={{cursor:'pointer', backgroundColor:color1, borderColor:color2, fontSize:25, padding:10, paddingRight:20, paddingLeft:20, borderRadius:10, marginBottom:5, display:"flex", flexDirection:"column", width:"80vw"}}>
      <div style={{fontSize:20, display:"flex", flexDirection:"row", justifyContent:"space-between", alignContent:"center"}}>
        <p>{name}</p>
        <p style={{fontWeight:'bold'}}>{value} {unit}</p>
      </div>
      {moreInfo ?
        <ul style={{marginTop:10, display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
          <p style={{fontSize:15}}>Calories: {nutrients[[0]].valueNumeric} {nutrients[[0]].uom}</p>
          <p style={{fontSize:15}}>Protein:  {nutrients[[1]].valueNumeric} {nutrients[[1]].uom}</p>
          <p style={{fontSize:15}}>Carbohydrates: {nutrients[[2]].valueNumeric} {nutrients[[2]].uom}</p>
          <p style={{fontSize:15}}>Sugar: {nutrients[[3]].valueNumeric} {nutrients[[3]].uom}</p>
          <p style={{fontSize:15}}>Total Fat: {nutrients[[4]].valueNumeric} {nutrients[[4]].uom}</p>
          <p style={{fontSize:15}}>Saturated Fat: {nutrients[[5]].valueNumeric} {nutrients[[5]].uom}</p>
          <p style={{fontSize:15}}>Cholesterol: {nutrients[[6]].valueNumeric} {nutrients[[6]].uom}</p>
          <p style={{fontSize:15}}>Dietary Fiber: {nutrients[[7]].valueNumeric} {nutrients[[7]].uom}</p>
          <p style={{fontSize:15}}>Sodium: {nutrients[[8]].valueNumeric} {nutrients[[8]].uom}</p>
          <p style={{fontSize:15}}>Potassium: {nutrients[[9]].valueNumeric} {nutrients[[9]].uom}</p>
          <p style={{fontSize:15}}>Calcium: {nutrients[[10]].valueNumeric} {nutrients[[10]].uom}</p>
          <p style={{fontSize:15}}>Iron: {nutrients[[11]].valueNumeric} {nutrients[[11]].uom}</p>
          <p style={{fontSize:15}}>Trans Fat: {nutrients[[12]].valueNumeric} {nutrients[[12]].uom}</p>
          <p style={{fontSize:15}}>Vitamin D: {nutrients[[13]].valueNumeric} {nutrients[[13]].uom}</p>
          <p style={{fontSize:15}}>Vitamin C: {nutrients[[14]].valueNumeric} {nutrients[[14]].uom}</p>
          <p style={{fontSize:15}}>Vitamin A: {nutrients[[16]].valueNumeric} {nutrients[[16]].uom}</p>
        </ul>
        :
        <ul></ul>
      }
    </div>
    
    </>
  )
}


export default FeaturedFoods