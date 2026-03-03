from flask import Flask
import requests
from datetime import datetime
import cloudscraper

app = Flask(__name__)


# URL used to get breakfast menus, note that the date has to be passed into the string:
# "https://apiv4.dineoncampus.com/locations/6779562d351d53052c3b5728/menu?date={date}&period=69842463771598a5a62753a8"

# We will add a wrapper function for getting data from this url with a given date, meal, and location, but for practice,
# you will have to manually change only date via concatenation (any format is fine but YYYY-MM-DD is preferrred) to the current date
# use datetime.today().strftime('%Y-%m-%d') to get the current date

LOCATIONS_URL = "https://api.dineoncampus.com/v1/locations/status?site_id=5e6fcc641ca48e0cacd93b04&platform="
PERIODS_URL = "https://api.dineoncampus.com/v1/location/{location_id}/periods?platform=0&date={date_str}"

REQUEST_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36"
}


@app.route("/")
def menu():
    return "<p>test</p>"


# For all following responses, nutrients and calories should be integers, but serving size should be a string


@app.route("/menu/<filters>")
def get_menu(filters: list[str]) -> list[dict]:
    """
    Gets all food items for a given meal period
    :param filters: list of given filters, when applied should return object only with applicable foods
    ;return: list of all items as dicts specifying calories, portion, nutrients, id, customAllergens, nutrients, and location
    """
    # TODO: Aarav
    return {}


@app.route("/fiber")
def get_fiber_sources() -> list[dict]:
    """
    Gets all high fiber foods for a give meal period (3g fiber or more per 100 calories)
    ;return: list of all high-fiber items as dicts specifying calories, portion, nutrients, id, customAllergens, nutrients, and location
    """

    # TODO: Vincent
    scraper = cloudscraper.create_scraper() 
    date = datetime.today().strftime('%Y-%m-%d')
    url = f"https://apiv4.dineoncampus.com/locations/6779562d351d53052c3b5728/menu?date={date}&period=69a64f35492f9a9e2e4c1db5"
    
    # Make the request to the API and parse the JSON response
    fiber_request = scraper.get(url, headers=REQUEST_HEADERS)
    fiber_request.raise_for_status()  
    data = fiber_request.json()
    high_fiber = []

    # Loop through nested objects
    categories = data.get("period", {}).get("categories", [])

    # Loop through categories and then items to find high fiber foods
    for category in categories:
        for item in category.get("items", []):
            fiber = 0
            calories = item.get("calories", 0)
            nutrients = item.get("nutrients", [])

            # Retrieve nutrients and check for dietary fiber
            for nutrient in nutrients:
                if nutrient.get("name", "").lower() == "dietary fiber (g)":
                    # For cases where grams are marked as "less than 1 gram"
                    try:
                        fiber = float(nutrient.get("value", 0))
                    except ValueError:
                        fiber = 0
                    break

            # Append if the item is high fiber (3g or more per 100 calories)
            if (calories > 0) and (fiber >= 3 * (calories / 100)):
                high_fiber.append({
                    "name": item.get("name", ""),
                    "fiber": fiber,
                    "portion": item.get("portion", ""),
                    "calories": calories,
                    "location": "The Eatery",
                    "nutrients": nutrients,
                    "customAllergens": item.get("customAllergens", []),
                })
                
    return high_fiber


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
