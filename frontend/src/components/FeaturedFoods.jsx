import React from "react"
import mockData from "../../mockData/featuredFoods.json"

const FeaturedFoods = () => {

    //TODO: Derin
    // This component displays a list of featured groups of foods that users select(high-protein, high-carb, high-fiber, etc.)
    // For now, you will read in some mock data that will match the form of the actual data and use that to generate the list
    // Each group should only show the top three foods, but users should be able to expand the list to show more

    return (
        <div>{mockData}</div>
    )
}

export default FeaturedFoods