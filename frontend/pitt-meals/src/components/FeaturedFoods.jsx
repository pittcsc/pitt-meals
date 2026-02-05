import React from "react"
import mockData from "../mockData/featuredFoods.json"

const FeaturedFoods = () => {

    //TODO: James
    //This page is the main menu where users will see a complete list of foods
    //Upon selecting one of more filter options(for now: Vegan, Vegetarian, Gluten-Free, High-Protein, Kosher, and Halal),
    //the options will narrow appropriately
    //Please create mock data in the imported file, it should somewhat resemble the format of what it will look like when it comes from the endpoint

    return (
        <div>{mockData}</div>
    )
}

export default FeaturedFoods