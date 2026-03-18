import allData from "../../../../mock-data/breakfast.json"
import { useFilters } from "./FiltersContext"
import {useState, useEffect, memo} from 'react'



const updateMenu = (filters, foodData) => {
    var allFoods = []
    foodData.forEach((location) => {
        location.items.forEach(food => {
            var contains=true
            filters.forEach(filter => {
                if(filter.selected==true) {
                    const notFoundFilter = food.filters.find(f => (filter.label==f.name))
                    if(notFoundFilter===undefined){
                        contains=false
                    }
                    
                } 
                food.NewPropertyName="Location"
                food.location = location.name
            })
            if(contains)    
                allFoods.push(food)        
        })
    })   
    return allFoods
}
const Menu = () => {
    const foodData = allData.period.categories
    const filters = useFilters()
    
    console.log(filters)
    const displayFoods = updateMenu(filters, foodData)
    


    const FoodItem = ({food}) => {
        const [open, setOpen] = useState(false)
        const toggle = () => {
            setOpen(open=>!open)
        }
        const capitalize = (food) => {
            return String(food).charAt(0).toUpperCase() + String(food).slice(1)
        }
        const AccordionWrapper = () => {
            
            return (
                <>
                    <div onClick={toggle}>{capitalize(food.name)}</div>
                </>

            )
        }
        const AccordionItems = () => {
            return(
                <div className="space-y-1">
                    <div>Location: {food.location}</div>
                    <div>Fiber: {food.fiber}</div>
                    <div>Portion: {food.portion}</div>
                    <div>Calories: {food.calories}</div>
                </div>
            )
        }
        return(
            <>
                <AccordionWrapper />
                <AccordionItems/>   
            </>
        )
    }
    return (
        
        <div className="space-y-4 justify-self-end" >
            {displayFoods.map((food, index) => (
                <FoodItem food = {food} key = {index}></FoodItem>
                
            ))}
        </div>
    )
}
export default Menu