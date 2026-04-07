CREATE TABLE locations (
    id TEXT PRIMARY KEY, -- same location id as dine on campus api
    name TEXT NOT NULL -- location name (eatery/perch)
);

CREATE TABLE menu_periods (
    id SERIAL PRIMARY KEY,  
    location_id TEXT NOT NULL REFERENCES locations(id), -- location id from locations table
    date DATE NOT NULL, 
    meal_period TEXT NOT NULL, -- breakfast/lunch/dinner
    period_id TEXT NOT NULL -- same period id as dine on campus api
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL -- table 33, kokumi, etc
);

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY, 
    period_id INTEGER NOT NULL REFERENCES menu_periods(id), -- period id from menu_periods table
    category_id INTEGER REFERENCES categories(id), -- category id from categories table
    name TEXT NOT NULL, -- scrambled eggs, etc
    portion TEXT, -- ex: "4 ounce"
    ingredients TEXT -- ex: "Liquid Egg, Canola Oil"
); 

CREATE TABLE nutrients (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES menu_items(id), -- menu item id from menu_items table
    name TEXT NOT NULL, -- calories, protein, fiber, etc
    value TEXT NOT NULL, -- ex: "13" or "less than 1 gram"
    uom TEXT NOT NULL -- ex: "g", "kcal", etc
);