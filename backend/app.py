from flask import Flask
import requests
from datetime import datetime
from flask import jsonify

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
    return "<p>test</p>"


# For all following responses, nutrients and calories should be integers, but serving size should be a string


@app.route("/menu/<filters>")
def get_menu(filters: str):
    """
    Gets all food items for a given meal period
    :param filters: list of given filters, when applied should return object only with applicable foods
    ;return: list of all items as dicts specifying calories, portion, nutrients, id, customAllergens, nutrients, and location
    """
    # Get current date
    curr_date = datetime.today().strftime('%Y-%m-%d')
    
    # Get meal period from filters
    seperate_filters = filters.split(",")

    # Set default meal period to breakfast if user doesn't specify
    meal_period = "breakfast"
    
    # Itererate through filters, checking if it is a valid meal period, if so set store that value as the meal period
    for i in seperate_filters:
        i = i.strip().lower()
        if i in ["breakfast", "lunch", "dinner"]:
            meal_period = i
    
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

    categories = menu_data.get("period", {}).get("categories", [])
    
    # Iterate through all categories and items, storing items in a dictionary with item id as key to avoid duplicates, then return the values of the dictionary as a list
    items_by_id = {}
    for cat in categories:
        for item in cat.get("items", []):
            item_id = item.get("id")
            if not item_id:
                continue
            items_by_id[item_id] = {
                "name": item.get("name"),
                "calories": item.get("calories"),
                "portion": item.get("portion"),
                "nutrients": item.get("nutrients", []),
                "id": item_id,
                "customAllergens": item.get("customAllergens", []),
                "location": {"id": eatery_id, "name": eatery.get("name")}
            }

    return jsonify(list(items_by_id.values()))


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

    # TODO: Jayson

    return {
        "example1": {
            "protein": 10,
            "portion": "100ml",
            "calories": 100,
            "location": "eatery",
            "nutrients": {},
            "customAllergens": [],
        },
        "example2": {
            "protein": 12,
            "portion": "2oz",
            "calories": 100,
            "location": "eatery",
            "nutrients": {},
            "customAllergens": [],
        },
    }


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
