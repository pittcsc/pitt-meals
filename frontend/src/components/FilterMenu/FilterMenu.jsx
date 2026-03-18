import React, {use, useEffect, useState} from "react"
import Filters from "./Filters.jsx"
import Menu from "./Menu.jsx"
import MenuProvider from "./FiltersContext.jsx"
import allData from "../../../../mock-data/breakfast.json"

const FilterMenu = () => {
    //TODO: James
    //This page is the main menu where users will see a complete list of foods
    //Upon selecting one of more filter options(for now: Vegan, Vegetarian, Gluten-Free, High-Protein, Kosher, and Halal),
    //the options will narrow appropriately
    //Please create mock data in the imported file, it should somewhat resemble the format of what it will look like when it comes from the endpoint

    return (
        <div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr]" >
            <div className="col-start-3 row-start-3 flex max-w-lg flex-col text-center">
                    <h1>Pitt Meals</h1>
                    <h2>{allData.period.name} for {allData.date}</h2>
                    <MenuProvider>
                        <Filters></Filters> 
                        <Menu></Menu>   
                    </MenuProvider>   
            </div>
        </div>
    )
   
}
export default FilterMenu 