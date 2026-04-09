CREATE TABLE locations (
    id INTEGER PRIMARY KEY, -- parsing the location id from api
    location_name VARCHAR(30) NOT NULL -- location name (eatery/perch)
);

CREATE TABLE menu_periods (
    id SERIAL PRIMARY KEY,  
    location_id INTEGER NOT NULL REFERENCES locations(id), -- location id from locations table
    cur_date DATE NOT NULL, 
    meal_period VARCHAR(30) NOT NULL, -- breakfast/lunch/dinner
    period_id TEXT NOT NULL -- same period id as dine on campus api
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(30) NOT NULL -- table 33, kokumi, etc
);

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY, 
    period_id INTEGER NOT NULL REFERENCES menu_periods(id), -- period id from menu_periods table
    category_id INTEGER REFERENCES categories(id), -- category id from categories table
    item_name VARCHAR(100) NOT NULL, -- scrambled eggs, etc
    portion VARCHAR(30), -- ex: "4 ounce"
    ingredients TEXT -- ex: "Liquid Egg, Canola Oil"
); 

CREATE TABLE nutrients (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES menu_items(id), -- menu item id from menu_items table
    nutrient_name VARCHAR(30) NOT NULL, -- calories, protein, fiber, etc
    value VARCHAR(30) NOT NULL, -- ex: "13" or "less than 1 gram"
    unit_of_measure VARCHAR(15) NOT NULL -- ex: "g", "kcal", etc
);