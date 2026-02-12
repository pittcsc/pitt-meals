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
const FilterMenu = () => {
    const differentFilters = [
        {label: "Dairy Free"},
        {label: "Gluten free"}, 
        {label: "Halal"},
        {label: "Nut Free"},
        {label: "Shellfish Free"},
        {label:  "Vegan"},
        {label: "Vegetarian"}]
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
        <AllFilters open = {open}>{content}</AllFilters>
    </div>
    )   
}
const MainFilterButton = ({toggle, open, keyword}) => {
    return(
        <button onClick={toggle}>{keyword}</button>
    )
}
const AllFilters = ({open, children}) => {
    return (
        <div>
            {children}
        </div>
        
    )
}
const FiltersButton = ({children}) => {
    
    return(
        <button>{children}</button>
    )
}



const ParseForKeyword = ({keyword}) => {
    var goodData=[]
    for(var i=0;i<mockData.length;i++){
        for(var j = 0;j<mockData[i].customAllergens.length;j++) {
            if (mockData[i].customAllergens[j]==keyword) {
                goodData.push(mockData[i].name)
            }
        }  
    }
    console.log(goodData)
        return (<div>
            {goodData[0]}
        </div>);
    
}
export default FilteredMenu