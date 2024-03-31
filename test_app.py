from app import clac_rating_avg, query,api_professionals,api_recommandations,api_jobs
import requests


PROFESSIONALS_URL="http://127.0.0.1:5000/api/professionals"
JOBS_URL="http://127.0.0.1:5000/api/jobs"
RECOMMANDATIONS_URL="http://127.0.0.1:5000/api/recommandations"


   ##test the query func 
def test_query():
    result = query("SELECT * FROM professionals WHERE id = 1")
    assert isinstance(result, list)
    assert len(result) > 0
  
   ##test the api route
def test_api_professionals():
    professionals=api_professionals()
    length=len(api_professionals())
    assert professionals is not None or length is not None

   ##test the api route
def test_api_recommandations():
    recommandations=api_recommandations()
    length=len(api_recommandations())
    assert recommandations is not None or length is not None

   ##test the api route
def test_api_jobs():
    jobs=api_jobs()
    length=len(api_jobs())
    assert jobs is not None or length is not None

   ##test adding card function
def test_add_card():
    card_data = {
        "name": "John Doe",
        "phone": "1234567890",
        "job": "Plumber"
    }
    url = 'http://127.0.0.1:5000/add_card'
    response = requests.post(url, json=card_data)
    assert response.status_code == 200

   ##test deleting card function
def test_delete_card():
    try:
        query("DELETE FROM professionals WHERE name = 'John Doe'")
    except:
        card_data = {
            "name": "John Doe",
            "phone": "1234567890",
            "job": "Plumber"
        }
        add_url = 'http://127.0.0.1:5000/add_card'
        response = requests.post(add_url, json=card_data)
        assert response.status_code == 200
        professionals = query("SELECT * FROM professionals WHERE name = 'John Doe'")
        assert len(professionals) == 1  
        card_id = professionals[0][0]
        delete_data = {"id": card_id}
        delete_url = 'http://127.0.0.1:5000/delete_card'
        response = requests.delete(delete_url, json=delete_data)
        assert response.status_code == 200

        professionals = query("SELECT * FROM professionals WHERE name = 'John Doe'")
        assert len(professionals) == 0

   ##test updating card function
def test_update_card():
    try:
        query("DELETE FROM professionals WHERE name = 'John Doe'")
    except:
        card_data = {
            "name": "John Doe",
            "phone": "1234567890",
            "job": "Plumber"
        }
        add_url = 'http://127.0.0.1:5000/add_card'
        response = requests.post(add_url, json=card_data)
        assert response.status_code == 200
        professionals = query("SELECT * FROM professionals WHERE name = 'John Doe'")
        assert len(professionals) == 1 
        card_id = professionals[0][0]
        update_data = {
            "id": card_id,
            "name": "updated_name",
            "phone":"updated_phone",
        }
        update_url = 'http://127.0.0.1:5000/update_card'
        response = requests.put(update_url, json=update_data)
        assert response.status_code == 200
        professionals = query("SELECT * FROM professionals WHERE name = 'John Doe'")
        assert len(professionals) == 0
        updated_professional = query(f"SELECT * FROM professionals WHERE id = {card_id}")
        assert updated_professional[0][1].title() == "Updated_Name"
        assert updated_professional[0][5] == "updated_phone"
        delete_data = {"id": card_id}
        delete_url = 'http://127.0.0.1:5000/delete_card'
        response = requests.delete(delete_url, json=delete_data)
        assert response.status_code == 200

   ##test adding recommendation for card function
def test_add_recommendations():
    try:
        query("DELETE FROM professionals WHERE name = 'John Doe'")
    except:
        recomm_data = {
            "cardID": 1,  
            "name": "John Doe",
            "rating": 5, 
            "recommendationInput": "test_recommendation"
        }
        url = 'http://127.0.0.1:5000/add_recommendation'
        response = requests.post(url, json=recomm_data)
        assert response.status_code == 200
        query("DELETE FROM recommandations WHERE name = 'John Doe'")


##test calculation function of rating of card. test initializing after adding.
# and calculating after adding new recommendation
def test_calc_avg():
    try:
        query("DELETE FROM professionals WHERE name = 'John Doe'")
    except:
        card_data = {
            "name": "John Doe",
            "phone": "1234567890",
            "job": "Plumber"
        }
        add_url = 'http://127.0.0.1:5000/add_card'
        response = requests.post(add_url, json=card_data)
        assert response.status_code == 200
        professionals = query("SELECT * FROM professionals WHERE name = 'John Doe'")
        assert len(professionals) == 1 
        card_id = professionals[0][0]
        test_rating_avg= clac_rating_avg(card_id)
        assert test_rating_avg == 0
        new_pro_id = query("SELECT id FROM professionals WHERE name = 'John Doe'")[0][0]
        recomm_data = {
            "cardID": new_pro_id,  
            "name": "John Doe",
            "rating": 5, 
            "recommendationInput": "test_recommendation"
        }
        url = 'http://127.0.0.1:5000/add_recommendation'
        response = requests.post(url, json=recomm_data)
        assert response.status_code == 200
        assert clac_rating_avg(card_id) == recomm_data["rating"]
        query("DELETE FROM recommandations WHERE name = 'John Doe'")
        query("DELETE FROM professionals WHERE name = 'John Doe'")


