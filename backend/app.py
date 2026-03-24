from flask import Flask, jsonify, request
import requests
from datetime import datetime
import json
import os

app = Flask(__name__)


# URL used to get breakfast menus, note that the date has to be passed into the string:
# "https://apiv4.dineoncampus.com/locations/6779562d351d53052c3b5728/menu?date={date}&period=69842463771598a5a62753a8"

# We will add a wrapper function for getting data from this url with a given date, meal, and location, but for practice,
# you will have to manually change only date via concatenation (any format is fine but YYYY-MM-DD is preferrred) to the current date
# use datetime.today().strftime('%Y-%m-%d') to get the current date

LOCATIONS_URL = "https://api.dineoncampus.com/v1/locations/status?site_id=5e6fcc641ca48e0cacd93b04&platform="
PERIODS_URL = "https://api.dineoncampus.com/v1/location/{location_id}/periods?platform=0&date={date_str}"

REQUEST_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
}


@app.route("/")
def menu():
    get_protein_sources
    return "<p>test</p>"


# For all following responses, nutrients and calories should be integers, but serving size should be a string


@app.route("/menu")
def get_menu():
    """
    Gets all food items for a given meal period with mock data
    """

    meal_period = request.args.get("meal", "breakfast").strip().lower()
    filters = [f.strip().lower() for f in request.args.getlist("filter") if f.strip()]

    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(base_dir)
    file_path = os.path.join(project_root, "mock-data", "breakfast.json")
    
    if not os.path.exists(file_path):
        return jsonify({"error": "mock breakfast file not found"}), 404
    with open(file_path, "r", encoding="utf-8") as file:
        menu_data = json.load(file)
    categories = menu_data.get("period", {}).get("categories", [])

    # Iterate through all categories and items, storing items in a dictionary with item id as key to avoid duplicates, then return the values of the dictionary as a list
    items_by_id = {}
    for cat in categories:
        for item in cat.get("items", []):
            item_id = item.get("id")
            if not item_id:
                continue
            if filters:
                item_text = json.dumps(item).lower()
                if not all(filter_value in item_text for filter_value in filters):
                    continue
            items_by_id[item_id] = {
                "name": item.get("name"),
                "calories": int(item.get("calories")) if item.get("calories") not in [None, ""] else None,
                "portion": str(item.get("portion")) if item.get("portion") is not None else "",
                "nutrients": item.get("nutrients", []),
                "id": item_id,
                "customAllergens": item.get("customAllergens", []),
                "location": {"id": None, "name": "The Eatery"}
            }

    return jsonify(list(items_by_id.values()))

@app.route("/menu-data", methods=["POST"])
def get_menu_data():
    """Hits DineOnCampus API and writes breakfast, lunch, and dinner
    menus for the eatery to seperate local files
    """
    # Get current date
    curr_date = datetime.today().strftime('%Y-%m-%d')
    
    # GET Request to LOCATIONS_URL to get all locations
    location_request = requests.get(LOCATIONS_URL, headers=REQUEST_HEADERS)
    
    # Throw error if request was unsuccessful
    location_request.raise_for_status()

    # Convert json response to a python data structures
    location_data = location_request.json()
    
    # Get list of all locations from the data
    locations_list = location_data["locations"]

    eatery = None

    # Find the eatery in the list of locations, if it doesn't exist throw an error
    for loc in locations_list:
        if loc.get("name") == "The Eatery":
            eatery = loc
            break

    if not eatery:
        return jsonify({"error": "Eatery not found"}), 404
    
    eatery_id = eatery["id"]
    
    
    # GET request to PERIODS_URL to get all meal periods for the eatery, then find the meal period specified by the user, if it doesn't exist throw an error
    period_url = PERIODS_URL.format(location_id=eatery_id, date_str=curr_date)
    period_request = requests.get(period_url, headers=REQUEST_HEADERS)
    period_request.raise_for_status()
    period_data = period_request.json()

    periods_list = period_data.get("periods", [])

    base_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(base_dir)
    mock_data_dir = os.path.join(project_root, "mock-data")

    os.makedirs(mock_data_dir, exist_ok=True)

    

    written_files = {}

    for meal_period in ["breakfast", "lunch", "dinner"]:
        period = None


        for p in periods_list:
            if p.get("name", "").strip().lower() == meal_period:
                period = p
                break
    
        if not period:
            return jsonify({"error": f"{meal_period} period not found for eatery"}), 404
    
        period_id = period["id"]

        # GET request to menu url to get all menu items for the eatery and meal period, then return the data as list of dicts
        menu_url = f"https://apiv4.dineoncampus.com/locations/{eatery_id}/menu?date={curr_date}&period={period_id}"
        menu_request = requests.get(menu_url, headers=REQUEST_HEADERS)
        menu_request.raise_for_status()
        menu_data = menu_request.json()

        file_path = os.path.join(mock_data_dir, f"{meal_period}.json")
        with open(file_path, "w", encoding="utf-8") as file:
            json.dump(menu_data, file, indent=2)
        written_files[meal_period] = file_path

    return jsonify({
        "message": "Menu data successfully written to files",
        "files": written_files

    }), 201


    # TODO: Aarav
    


@app.route("/fiber")
def get_fiber_sources() -> list[dict]:
    """
    Gets all high fiber foods for a give meal period (3g fiber or more per 100 calories)
    ;return: list of all high-fiber items as dicts specifying calories, portion, nutrients, id, customAllergens, nutrients, and location
    """

    # TODO: Vincent

    return {
        "example1": {
            "fiber": 6,
            "portion": "2oz",
            "calories": 100,
            "location": "eatery",
            "nutrients": {},
            "customAllergens": [],
        },
        "example2": {"fiber": 10, "portion": "100g", "calories": 100},
    }


@app.route("/protein")
def get_protein_sources() -> dict:
    """
    Gets all high-protein items for a give meal period (10g protein or more per 100 calories)
    ;return: list of all high-protein items as dicts specifying calories, portion, nutrients, id, customAllergens, nutrients, and location
    """
    date = datetime.today().strftime('%Y-%m-%d')
    url = f"https://apiv4.dineoncampus.com/locations/6779562d351d53052c3b5728/menu?date={date}&period=6992ce0d54c66406ba4ce409"
    
    response = requests.get(url)
    print("Status code:", response.status_code)
    print("Response content:", response.text)
    if(response.status_code == 200 and response.text.strip()):
            data = response.json()
    else:
         return {"error": "Failed to fetch data from the API"}
    print(data)

    high_protein_items = []
    categories = data.get('period', {}).get("categories", [])
    for category in categories:
        items = category.get("items", [])
        for item in items:
            nutrients = item.get("nutrients", [])
            protein = 0
            calories = 0
            for nutrient in nutrients:
                if nutrient.get("name") == "Protein":
                    protein = float(nutrient.get("value", 0))
                elif nutrient.get("name") == "Calories":
                    calories = float(nutrient.get("value", 0))
            if calories > 0 and protein >= 10 * (calories / 100):
                high_protein_items.append({
                    "protein": protein,
                    "portion": item.get("portion", ""),
                    "calories": calories,
                    "location": item.get("location", ""),
                    "nutrients": nutrients,
                    "customAllergens": item.get("customAllergens", []),
                    "id": item.get("id", ""),
        })

    # TODO: Jayson

    return high_protein_items

@app.route("/carbs")
def get_carb_sources() -> dict:
    """
    Gets all high-carb items for a give meal period (20g or more grams per 100 calories)
    ;return: list of all high-carb items as dicts specifying calories, portion, nutrients, id, customAllergens, nutrients, and location
    """

    # TODO: Steven

    return {
        "example1": {
            "carbs": 20,
            "portion": "30g",
            "calories": 100,
            "location": "eatery",
            "nutrients": {},
            "customAllergens": [],
        },
        "example2": {
            "fiber": 10,
            "portion": "2oz",
            "calories": 100,
            "location": "eatery",
            "nutrients": {},
            "customAllergens": [],
        },
    }
if __name__ == "__main__":
    app.run(debug=True)