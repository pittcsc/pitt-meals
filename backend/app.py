from flask import Flask
import requests
from datetime import datetime

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