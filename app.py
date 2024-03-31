from flask import Flask, render_template, request
from flask_cors import CORS
import sqlite3
import json

def query(sql:str="", db_name="profinder.db"):
    with sqlite3.connect(db_name) as conn:
        cur = conn.cursor()
        rows = cur.execute(sql)
        return list(rows)    

app = Flask(__name__)
CORS(app)

app.secret_key = 'OfirTalCode'

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/', methods = ['POST', 'GET'])
def home():
    return render_template('home.html')

@app.route('/cards', methods = ['POST', 'GET'])
def cards():
    return render_template('cards.html')

@app.route('/admin', methods = ['POST', 'GET'])
def admin():
    return render_template('admin.html')

@app.route('/delete_card', methods = ['POST', 'GET', 'DELETE'])
def delete_card():
    data_received = request.json
    id = data_received.get('id')
    query(sql=f"DELETE FROM professionals WHERE id={id}")
    return render_template('admin.html')

@app.route('/add_card', methods = ['POST', 'GET'])
def add_card():
    data_received = request.json
    name = data_received.get('name').title()
    phone = data_received.get('phone')
    job = data_received.get('job')
    rating = 0
    query(sql=f"INSERT INTO professionals (name,profession,rating,phone) VALUES ('{name}','{job}', '{rating}', '{phone}')")
    return render_template('admin.html')

@app.route('/update_card', methods = ['POST', 'GET', 'PUT'])
def update_card():
    data_received = request.json
    id = data_received.get('id')
    name = data_received.get('name').title()
    phone= data_received.get('phone')
    if name != "" and phone != "":
            query(sql=f"UPDATE professionals SET name='{name}',phone='{phone}' WHERE id={id}")
    if name == "":
        query(sql=f"UPDATE professionals SET phone='{phone}' WHERE id={id}")
    if phone == "":
        query(sql=f"UPDATE professionals SET name='{name}' WHERE id={id}")
    return render_template('admin.html')

@app.route('/add_recommendation', methods = ['POST', 'GET'])
def add_recommendation():
    data_received = request.json
    cardID = data_received.get('cardID')
    name = data_received.get('name')
    rating = data_received.get('rating')
    recommendationInput = data_received.get('recommendationInput')
    query(sql=f"INSERT INTO recommandations (name,pro_id,rating,recommandation) VALUES ('{name}','{cardID}', {rating}, '{recommendationInput}')")
    return render_template('home.html')

@app.route('/api/jobs', methods = ['POST', 'GET'])
def api_jobs():
    jobs = query(f"SELECT * FROM jobs")
    jobs_json = []
    for job in jobs:
        job_json = {"id": job[0], "job": job[1], "image": job[2]}
        jobs_json.append(job_json)
    return json.dumps(jobs_json)

@app.route('/api/recommandations', methods = ['POST', 'GET'])
def api_recommandations():
    recommandations = query(f"SELECT * FROM recommandations")
    recommandations_json = []
    for recommandation in recommandations:
        recommandation_json = {"id": recommandation[0], "name": recommandation[1], "pro_name": recommandation[2], "rating": recommandation[3], "recommandation":recommandation[4]}
        recommandations_json.append(recommandation_json)
    return json.dumps(recommandations_json)

@app.route('/api/professionals', methods = ['POST', 'GET'])
def api_professionals():
    professionals = query(f"SELECT * FROM professionals")
    professionals_json = []
    for professional in professionals:
        job= query(f"SELECT job FROM jobs where id= {professional[2]}")
        image =  query(f"SELECT image FROM jobs where id= {professional[2]}")
        rating= clac_rating_avg(professional[0])
        professional_json = {"id": professional[0], "name": professional[1], "profession": job[0][0], "rating":rating, "cities":professional[4], "phone": professional[5], "image":image[0][0]}
        professionals_json.append(professional_json)
    return json.dumps(professionals_json)

def clac_rating_avg(pro_id):
    rating = query(f"SELECT rating FROM recommandations WHERE pro_id = {pro_id}")
    rating_list = list(rating)
    if not rating_list:
        rating_avg = 0
    else:
        sum=0
        for rate in rating_list:
            sum += float(rate[0])
        rating_avg = round(sum / len(rating_list),1)
    return rating_avg


# def create_table(table="professionals"):
#     sql = f"CREATE TABLE IF NOT EXISTS {table} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, profession  TEXT, rating INT, cities TEXT, phone TEXT)"
#     query(sql= sql, db_name="profinder.db")
    

# def create_table(table="recommandations"):
#     sql = f"CREATE TABLE IF NOT EXISTS {table} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,pro_name TEXT, rating INT, recommandation TEXT)"
#     query(sql= sql, db_name="profinder.db")


# def create_table(table="jobs"):
#     sql = f"CREATE TABLE IF NOT EXISTS {table} (id INTEGER PRIMARY KEY AUTOINCREMENT, job TEXT, image TEXT)"
#     query(sql= sql, db_name="profinder.db")


# # create_table(table="professionals")
# create_table(table="recommandations")
# # create_table(table="jobs")
