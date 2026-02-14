import React, {useState} from "react"
import mockData from "../../mockData/menu.json"

const FilteredMenu = () => {
    //TODO: James
    //This page is the main menu where users will see a complete list of foods
    //Upon selecting one of more filter options(for now: Vegan, Vegetarian, Gluten-Free, High-Protein, Kosher, and Halal),
    //the options will narrow appropriately
    //Please create mock data in the imported file, it should somewhat resemble the format of what it will look like when it comes from the endpoint

    return (
        <>
            <h1 id = "header">Pitt Meals</h1> {/*placeholer title until we make a real one */}
            <div>
                    <FilterMenu></FilterMenu>       
            </div>
        </>
    )
   
}

//wrapper component for filter menu
const FilterMenu = () => {
    const differentFilters = [
        {label: "Vegan"},
        {label: "Vegetarian"}, 
        {label: "Gluten-Free"},
        {label: "High-Protein"},
        {label: "Kosher"},
        {label: "Halal"},]
    
    const [[selectedFilters], updateFilters] = useState([""])
    const addFilters = ({newFilter}) => {
        updateFilters(selectedFilters => selectedFilters.push(newFilter))
    }

    const content = <>{
        differentFilters.map(filter => (
            <FiltersButton key={filter.label}>{filter.label}</FiltersButton>
        ))
    } </>
    const [open, setOpen] = useState(false);
    const toggle = () => {      
        setOpen((open) => !open)
    }
    return(
    <div>
        <MainFilterButton toggle = {toggle} open ={open} keyword = "Filters"></MainFilterButton>
        <AllFilters open = {open} addFilters={addFilters}>{content}</AllFilters>
        <ListOfFoods keywords = {selectedFilters}></ListOfFoods>
    </div>
    )   
}

//filter button
const MainFilterButton = ({toggle, open, keyword}) => {
    return(
        <button onClick={toggle}>{keyword}</button>
    )
}

//wrapper component for all of the filters
const AllFilters = ({open, children, addFilters}) => {
    return (
        <div addFilters = {addFilters}>
            {children}
        </div>
        
    )
}

//button for each type of filter
const FiltersButton = ({children, addFilters}) => {
    return(
        <button onClick={addFilters}>{children}</button>
    )
}

//displays all of the foods
const ListOfFoods = ({keywords}) => {
    return (
        <>
            {keywords.map((keyword) => {
                mockData.map((food) => (
                    food.customAllergens.map((allergen, index) => {
                        if (allergen==keyword) {
                            return(<div key = {index}>{food.name}</div>)
                        }
                    })
                ))
            })}
                
        </>
    )
}
export default FilteredMenu