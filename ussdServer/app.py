from __future__ import print_function
import africastalking
import requests
import json
from flask import Flask, request

url = "http://localhost:3000"
app = Flask(__name__)


@app.route("/ussd", methods=["POST"])
def ussd():
    # Read the variables sent via POST from our API

    phone_number = request.values.get("phoneNumber", None)
    text = request.values.get("text", "default")
    try:
        user = requests.post(
            url + "/ussdAuth/login", data={"number": phone_number}
        ).json()
        user_name = user["userName"]
    except Exception as e:
        print(e)
        user_name = "Guest"
    if text == "":
        # This is the first request. Note how we start the response with CON
        print(phone_number)
        response = (
            "CON Welcome to Crowd source, {} \n".format(user_name)
            + "What would you like to do today?\n"
        )

        response += "1. View registered Locations \n"
        response += "2. Register a Location \n"
        response += "3. View reports \n"
        response += "4. Make reports \n"
        response += "5. Register as a user \n"

    elif text == "1":
        # View registered Locations you are given some filters
        response = "CON Select a filter \n"
        response += "1. View all locations \n"
        response += "2. View locations by country \n"
        response += "3. View locations by city \n"
        response += "4. View locations by state \n"
        response += "5. View locations by address \n"

    elif text == "1*1":
        locations = requests.get(url + "/location").json()
        for location in locations:
            response += "Country: {} \n".format(location["country"])
            response += "City: {} \n".format(location["city"])
            response += "State: {} \n".format(location["state"])
            response += "Address: {} \n".format(location["address"])
            response += "---------------------------------- \n"
        response += "END These are the registered locations"
        return response

    elif text == "1*2":
        # View locations by country
        response = "CON Enter the country name"
    elif text.startswith("1*2*"):
        country = text.split("*")[2]
        locations = requests.get(url + "/location/country/" + country).json()
        for location in locations:
            response += "Country: {} \n".format(location["country"])
            response += "City: {} \n".format(location["city"])
            response += "State: {} \n".format(location["state"])
            response += "Address: {} \n".format(location["address"])
            response += "---------------------------------- \n"
        response += "END These are the registered locations in {}".format(country)
        return response

    elif text == "1*3":
        # View locations by city
        response = "CON Enter the city name"
    elif text.startswith("1*3*"):
        city = text.split("*")[2]
        locations = requests.get(url + "/location/city/" + city).json()
        for location in locations:
            response += "Country: {} \n".format(location["country"])
            response += "City: {} \n".format(location["city"])
            response += "State: {} \n".format(location["state"])
            response += "Address: {} \n".format(location["address"])
            response += "---------------------------------- \n"
        response += "END These are the registered locations in {}".format(city)
        return response
    elif text == "1*4":
        # View locations by state
        response = "CON Enter the state name"
    elif text.startswith("1*4*"):
        state = text.split("*")[2]
        locations = requests.get(url + "/location/state/" + state).json()
        for location in locations:
            response += "Country: {} \n".format(location["country"])
            response += "City: {} \n".format(location["city"])
            response += "State: {} \n".format(location["state"])
            response += "Address: {} \n".format(location["address"])
            response += "---------------------------------- \n"
        response += "END These are the registered locations in {}".format(state)
        return response
    elif text == "1*5":
        # View locations by address
        response = "CON Enter the address"
    elif text.startswith("1*5*"):
        address = text.split("*")[2]
        locations = requests.get(url + "/location/address/" + address).json()
        for location in locations:
            response += "Country: {} \n".format(location["country"])
            response += "City: {} \n".format(location["city"])
            response += "State: {} \n".format(location["state"])
            response += "Address: {} \n".format(location["address"])
            response += "---------------------------------- \n"
        response += "END These are the registered locations in {}".format(address)
        return response

    elif text == "2":
        # Register a Location
        response = (
            "CON Enter the country_name, city_name, state_name, address in that format"
        )
    elif text.startswith("2*"):
        location = text.split("*")[1]
        location = location.split(",")
        country = location[0]
        city = location[1]
        state = location[2]
        address = location[3]
        myRequest = requests.post(
            url + "/location",
            data={
                "country": country,
                "city": city,
                "state": state,
                "address": address,
            },
        )
        if myRequest.status_code == 200:
            response = "END Location registered successfully"
        else:
            response = "END Location registration failed"
        return response
    elif text == "3":
        # View reports
        response = "CON Select a filter \n"
        response += "1. View all reports \n"
        response += "2. View reports by country \n"
        response += "3. View reports by city \n"
        response += "4. View reports by state \n"
        response += "5. View reports by address \n"

    elif text == "3*1":
        reports = requests.get(url + "/report").json()
        for report in reports:
            response += "Country: {} \n".format(report["country"])
            response += "City: {} \n".format(report["city"])
            response += "State: {} \n".format(report["state"])
            response += "Address: {} \n".format(report["address"])
            response += "---------------------------------- \n"
        response += "END These are the reports"
        return response

    elif text == "3*2":
        # View reports by country
        response = "CON Enter the country name"
    elif text.startswith("3*2*"):
        country = text.split("*")[2]
        reports = requests.get(url + "/report/country/" + country).json()
        for report in reports:
            response += "Country: {} \n".format(report["country"])
            response += "City: {} \n".format(report["city"])
            response += "State: {} \n".format(report["state"])
            response += "Address: {} \n".format(report["address"])
            response += "---------------------------------- \n"
        response += "END These are the reports in {}".format(country)
        return response
    elif text == "3*3":
        # View reports by city
        response = "CON Enter the city name"
    elif text.startswith("3*3*"):
        city = text.split("*")[2]
        reports = requests.get(url + "/report/city/" + city).json()
        if reports:
            for report in reports:
                response += "Country: {} \n".format(report["country"])
                response += "City: {} \n".format(report["city"])
                response += "State: {} \n".format(report["state"])
                response += "Address: {} \n".format(report["address"])
                response += "---------------------------------- \n"
            response += "END These are the reports in {}".format(city)
        else:
            response += "END No reports found in {}".format(city)
        return response

    elif text == "3*4":
        # View reports by state
        response = "CON Enter the state name"
    elif text.startswith("3*4*"):
        state = text.split("*")[2]
        reports = requests.get(url + "/report/state/" + state).json()
        if reports:
            for report in reports:
                response += "Country: {} \n".format(report["country"])
                response += "City: {} \n".format(report["city"])
                response += "State: {} \n".format(report["state"])
                response += "Address: {} \n".format(report["address"])
                response += "---------------------------------- \n"
            response += "END These are the reports in {}".format(state)
        else:
            response += "END No reports found in {}".format(state)
        return response

    elif text == "3*5":
        # View reports by address
        response = "CON Enter the address"
    elif text.startswith("3*5*"):
        address = text.split("*")[2]
        reports = requests.get(url + "/report/address/" + address).json()
        if reports:
            for report in reports:
                response += "Country: {} \n".format(report["country"])
                response += "City: {} \n".format(report["city"])
                response += "State: {} \n".format(report["state"])
                response += "Address: {} \n".format(report["address"])
                response += "---------------------------------- \n"
            response += "END These are the reports in {}".format(address)
        else:
            response += "END No reports found in {}".format(address)
        return response

    elif text == "4":
        # Make reports
        response = "CON Enter the address, report_decription in that format"
    elif text.startswith("4*"):
        report = text.split("*")[1]
        report = report.split(",")
        address = report[0]
        report_description = report[1]
        myRequest = requests.post(
            url + "/report",
            data={"address": address, "report_description": report_description},
        )
        if myRequest.status_code == 200:
            response = "END Report made successfully"
        else:
            response = "END Report making failed"
        return response
    elif text == "5":
        # Register as a user
        response = "CON Enter your user name, email, password in that format"
    elif text.startswith("5*"):
        user = text.split("*")[1]
        user = user.split(",")
        user_name = user[0]
        email = user[1]
        password = user[2]
        confirmPassword = password
        myRequest = requests.post(
            url + "/ussdAuth/register",
            data={
                "userName": user_name,
                "email": email,
                "number": phone_number,
                "password": password,
                "confirmPassword": confirmPassword,
            },
        )
        if myRequest.status_code == 200:
            response = "END User registered successfully"
        else:
            response = "END User registration failed"
        return response
    else:
        response = "END Invalid choice"
        return response
    return response


class SMS:
    def __init__(self):
        # Set your app credentials
        self.username = "app001"
        self.api_key = (
            "ae4ab7920eb757987e814f0360fa12ae8e3bafa3220ddc46968e73d5ad680754"
        )

        # Initialize the SDK
        africastalking.initialize(self.username, self.api_key)

        # Get the SMS service
        self.sms = africastalking.SMS

    def send(self, mess, recipients):
        # Set the numbers you want to send to in international format

        # Set your message
        message = mess

        # Set your shortCode or senderId
        try:
            # Thats it, hit send and we'll take care of the rest.
            response = self.sms.send(message, recipients)
            print(response)
        except Exception as e:
            print("Encountered an error while sending: %s" % str(e))


if __name__ == "__main__":
    app.run(debug=True)
