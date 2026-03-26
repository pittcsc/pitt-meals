import { useFiltersDispatch, useFilters } from "./FiltersContext"

export const Filters = () => {
    const filters = useFilters()
            return (
        <div className="relative grid grid-cols-6 flex">
            {filters.map(filter => (
                <div className = "w-max p-4" key = {filter.id}>
                    <Filter filter = {filter}></Filter>
                </div>
            ))}
        </div>
    )
}

function Filter ({filter}) {
    const dispatch = useFiltersDispatch()
    return (
        <button className = "bg-blue-500 "
        onClick = {() => {
            if(filter.selected==true)
                dispatch({
                    id: filter.id,
                    name: filter.name,
                    selected: true
                })
            else{
                dispatch({
                    id: filter.id,
                    name: filter.name,
                    selected: false
                })
            }
        }}>{filter.name}</button>
    )
}
export default Filters
