# ProFinder APP
ProFinder is a web application designed to connect users with professionals in various job categories. 
Whether you're looking for a plumber, electrician, carpenter, or any other service provider, 
ProFinder makes it easy to find the right professional for your needs.

## Features
1. Info Display:  Allows users to view professionals' details in organized cards, providing a clear and structured display of information. 

2. Search Functionality: Users can search for professionals based on categories, names, or phone numbers, making it convenient to find the desired service provider.

3. Recommendation System: Users have the ability to leave recommendations and ratings for professionals they have interacted with.

4. Rating Calculation: The application calculates and displays the total rating of each professional based on the ratings provided by users. 
This allows users to quickly assess the reputation and quality of service of each professional.

5. Admin Area: The admin area provides administrative functionalities such as creating, updating, and deleting professional cards.
Access to the admin area is restricted to authorized who have the login details only

## Getting Started

### Docker:

docker run -p 5000:5000 ofirtal/profinder:latest2

### Locally: 
1. git clone https://github.com/OfirTal0/ProFinder.git
2. cd ProFinder
3. python -m pip install -r requirements.txt
4. python app.py


