# ProFinder APP
ProFinder is a web application designed to connect users with professionals in various job categories. 
Whether you're looking for a plumber, electrician, carpenter, or any other service provider, 
ProFinder makes it easy to find the right professional for your needs.

## Features
Info Display:  Allows users to view professionals' details in organized cards, providing a clear and structured display of information. 

Search Functionality: Users can search for professionals based on categories, names, or phone numbers, making it convenient to find the desired service provider.

Recommendation System: Users have the ability to leave recommendations and ratings for professionals they have interacted with.

Rating Calculation: The application calculates and displays the total rating of each professional based on the ratings provided by users. 
This allows users to quickly assess the reputation and quality of service of each professional.

Admin Area: The admin area provides administrative functionalities such as creating, updating, and deleting professional cards.
Access to the admin area is restricted to authorized who have the login details only

## Getting Started

### Docker:

docker run -p 5000:5000 ofirtal/gameonweb

### Locally: 
git clone https://github.com/OfirTal0/ProFinder.git
cd ProFinder
python -m pip install -r requirements.txt
python app.py
