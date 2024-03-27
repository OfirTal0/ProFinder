from flask import Flask, render_template, request, redirect, session, jsonify 
from flask_cors import CORS
from datetime import datetime
import sqlite3
import json

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
        rating= clac_rating_avg(professional[0])
        professional_json = {"id": professional[0], "name": professional[1], "profession": professional[2], "rating":rating, "cities":professional[4], "phone": professional[5]}
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
        rating_avg = sum / len(rating_list)
    return rating_avg

#DB 

import sqlite3

def query(sql:str="", db_name="profinder.db"):
    with sqlite3.connect(db_name) as conn:
        cur = conn.cursor()
        rows = cur.execute(sql)
        return list(rows)    

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