# Per far partire un file flask,
#   1) immettersi nella shell
#   2) posizionarsi nella cartella ove situato il file con import FLASK
#   3) immettere il comando flask run -h 0.0.0.0 -p 5000
#       a) questo comando fa partire flask sulla porta 5000
#       b) ed accetta ogni connessione che parte sulla macchina
#   4) apparirà un link, cliccateci sopra, verrete redirezionati
#   5) CTRL+C per chiudere flask
import json

import pymongo
from flask import Flask, jsonify, request, render_template, session, redirect, url_for, send_from_directory, \
    make_response
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
CORS(app)

client = pymongo.MongoClient(
    "mongodb+srv://USER:PASSWORD@cluster.p0jl4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.get_database('LearnFlow_mongoDB')
login_collection = db['LF_login']
user_info = db['LF_user_info']


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        login_user = login_collection.find_one({'mail': request.form['mail']})
        if login_user:
            # controllo coincidenza password (se c'è questo utente)
            if bcrypt.checkpw(
                    request.form['password'].encode('utf-8'),
                    login_user['password']
            ):
                # -------> se tutto ok
                uname = login_user['username']
                item = user_info.find_one({'username': uname})
                # item['_id'] = str(item['_id'])  # da ObjectId a string.
                session['username'] = item['username']
                session['pnt'] = item['pnt']
                session['lvl'] = item['lvl']
                return redirect(url_for("MainGame"))
            else:
                # -------> se si hanno problemi di autenticazione 2
                return render_template("login.html", message="Username or password does't match")
        else:
            # -------> se si hanno problemi di autenticazione 1
            return render_template("login.html", message="Username or password does't match")
    else:
        if "username" in session and "pnt" in session and "lvl" in session:
            return redirect(url_for("MainGame"))
    return render_template("login.html")


def get_data_user(username):
    item = user_info.find_one({'username': username})
    item['_id'] = str(item['_id'])  # da ObjectId a string.
    session['username'] = item['username']
    session['lvl'] = item['lvl']
    session['pnt'] = item['pnt']
    return jsonify({'user_data': item})


@app.route('/MainGame/', methods=['GET', 'POST'])
def MainGame():
    if "username" in session and "pnt" in session and "lvl" in session:
        get_data_user(session['username'])
        return render_template('MainGame.html', username=session['username'], lvl=session['lvl'], pnt=session['pnt'])
    else:
        return redirect(url_for("login"))


@app.route('/logout/')
def logout():
    session.pop('username', None)
    session.pop('lvl', None)
    session.pop('pnt', None)
    return redirect(url_for("login"))


@app.route('/registration/', methods=['POST', 'GET'])
def registration():
    if request.method == 'POST':
        if request.form['password'] != request.form['pass_conf']:
            return render_template('registration.html', message="passwords do not match")
        existing_user = login_collection.find_one({'username': request.form['username']})
        existing_mail = login_collection.find_one({'mail': request.form['mail']})
        # se l'utente già esiste -> ritorna null, altrimeni lo crea inserendo i campi
        if existing_user is None or existing_mail is None:
            # si crea un record nel campo identificazione
            hashpass = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())
            login_collection.insert_one(
                {
                    'username': request.form['username'],
                    'mail': request.form['mail'],
                    'password': hashpass
                }
            )
            # si crea un record nel campo dati (di gioco)
            user_info.insert_one(
                {
                    'username': request.form['username'],
                    'lvl': '1',
                    'pnt': 0
                }
            )
            return redirect(url_for('login'))
        else:
            return render_template('registration.html', message="username or email has already been used")
    else:
        return render_template('registration.html')


@app.route('/update_data/<username>/<lvl>/<pnt>', methods=['POST'])
def update_data(username, lvl, pnt):
    myquery = {'username': username}
    newvalues = {"$set":
        {
            "username": username,
            "lvl": lvl,
            "pnt": int(pnt),
        }
    }
    user_info.update_one(myquery, newvalues)
    return "1"


@app.route('/get_top', methods=['GET'])
def get_top():
    item = user_info.find()
    item = item.sort("pnt", -1)
    item = item.limit(16)
    i = 0
    x = {i: {'n_item': str(item.count())}}
    for doc in item:
        i = i + 1
        x[i] = {'username': doc['username'], 'pnt': doc['pnt']}
    return json.dumps(x)


@app.route('/exercise_flow_chart/<pt>/<pnt>', methods=['GET'])
def exercise_flow_chart(pt, pnt):
    with open("static/json/flow_chart.json") as file:
        data = json.load(file)
    if "username" not in session and "pnt" not in session:
        return redirect(url_for("login"))
    else:
        return render_template('Exercise_flowchart.html', data=data, ex=pt, username=session['username'],
                               pnt=session['pnt'], score=pnt)


@app.route('/exercise_multiple_question/<pt>/<pnt>', methods=['GET'])
def exercise_multiple_question(pt, pnt):
    with open("static/json/multiple_question.json") as file:
        data = json.load(file)
    if "username" not in session and "pnt" not in session:
        return redirect(url_for("login"))
    else:
        return render_template('Exercise_question.html', data=data, ex=pt, username=session['username'],
                               pnt=session['pnt'], score=pnt)


@app.route('/theory/<pt>', methods=['GET'])
def theory(pt):
    if "username" not in session and "pnt" not in session:
        return redirect(url_for("login"))
    else:
        return render_template('Theory.html', ex=pt, username=session['username'], pnt=session['pnt'])


@app.route('/end_exercise/<pnt>', methods=['GET'])
def end_exercise(pnt=-1):
    if "username" not in session and "pnt" not in session and "lvl" not in session:
        return redirect(url_for("login"))
    else:
        return render_template("End_Exercise.html", username=session['username'], pnt=session['pnt'],
                               score=pnt, lvl=session['lvl'])

@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')


@app.route('/sw.js')
def service_worker():
    response = make_response(send_from_directory('static', 'sw.js'))
    response.headers['Cache-Control'] = 'no-cache'
    return response

if __name__ == '__main__':
    app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
    app.run(debug=True)
