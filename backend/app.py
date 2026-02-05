from flask import Flask
import requests
from datetime import datetime

app = Flask(__name__)


# URL used to get breakfast menus, note that the date has to be passed into the string:
# "https://apiv4.dineoncampus.com/locations/6779562d351d53052c3b5728/menu?date={date}&period=69842463771598a5a62753a8"

# We will add a wrapper function for getting data from this url with a given date, meal, and location, but for practice,
# you will have to manually change only date via concatenation (any format is fine but YYYY-MM-DD is preferrred) to the current date
# use datetime.today().strftime('%Y-%m-%d') to get the current date


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
    Gets all high fiber foods for a give meal period (8g fiber or more per 100 calories)
    ;return: list of all high-fiber items as dicts specifying calories, portion, nutrients, id, customAllergens, nutrients, and location
    """

    # TODO: Vincent

    return {
        "example1": {"fiber": 5, "serving_size": "2oz", "calories": 100},
        "example2": {"fiber": 10, "serving_size": "100g", "calories": 100},
    }


@app.route("/protein")
def get_protein_sources() -> dict:
    """
    Gets all high-protein items for a give meal period (10g protein or more per 100 calories)
    ;return: list of all high-protein items as dicts specifying calories, portion, nutrients, id, customAllergens, nutrients, and location
    """

    # TODO: Jayson

    return {
        "example1": {"protein": 30, "serving_size": "2oz", "calories": 100},
        "example2": {"protein": 20, "serving_size": "100g", "calories": 100},
    }


@app.route("/carbs")
def get_carb_sources() -> dict:
    """
    Gets all high-carb items for a give meal period (20g or more grams per 100 calories)
    ;return: list of all high-carb items as dicts specifying calories, portion, nutrients, id, customAllergens, nutrients, and location
    """

    # TODO: Steven

    return {
        "example1": {"protein": 30, "serving_size": "100mL", "calories": 100},
        "example2": {"protein": 40, "serving_size": "2oz", "calories": 100},
    }
