import { createContext, useContext, useReducer } from "react";

//create filters context that will be shared
const FiltersContext = createContext(null)
const FilterDispatchContext = createContext(null)

export function FiltersProvider({children}){
    const [filters, dispatch] = useReducer(
        filtersReducer, initialFilters
    )

    return (
        <FiltersContext value = {filters}>
            <FilterDispatchContext value = {dispatch}>
                {children}
            </FilterDispatchContext>
        </FiltersContext>
    )
}

export const useFilters = () =>{
    return useContext(FiltersContext)
}

export const  useFiltersDispatch = () => {
    return useContext(FilterDispatchContext)
}

const filtersReducer = (filters, action) => {
    console.log(action)
    switch (action.selected){
        case true: {
            const filterToChange = filters.find(f=>f.name == action.name)
            console.log(filterToChange)
            filterToChange.selected = false
            return  [...filters]
        }
        case false: {
            const filterToChange = filters.find(f=>f.name == action.name)
            console.log(filterToChange) 
            filterToChange.selected = true
            return  [...filters]
        }
        default: {
            console.log("bugin")
            return [...filters]
        }
    }    
}


const initialFilters =  [
    {id: 0, name: "Vegan", label: "Vegan", selected: false},
    {id: 1, name: "Vegetarian", label: "Vegetarian", selected: false}, 
    {id: 2, name: "Gluten Free", label: "Avoiding Gluten", selected: false},
    {id: 3, name: "High Protein", label: "Good Source of Protein", selected: false},
    {id: 4, name: "Kosher", label: "Kosher", selected: false},
    {id: 5, name: "Halal", label: "Halal", selected: false},
]
export default FiltersProvider 