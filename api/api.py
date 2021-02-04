import time
import secrets
from flask import Flask, render_template, request, abort

app = Flask(__name__)

class User:
    def __init__(self, name, email, username, password):
        self.name = name
        self.email = email
        self.username = username
        self.password = password
        
class Token:
    def __init__(self, user):
        self.user = user
        self.time = time.time()
        self.hex = secrets.token_hex(32)
        
class Country:
    def __init__(self, name, supplyMod, supplyPfi, supplyAst, dosedMod, dosedPfi, dosedAst):
        self.name = name;
        self.supplyMod = supplyMod;
        self.supplyPfi = supplyPfi;
        self.supplyAst = supplyAst;
        self.dosedMod = dosedMod;
        self.dosedPfi = dosedPfi;
        self.dosedAst = dosedAst;
        
        
users = []
tokens = []
countries = []
countries.append(Country("United States", 23618196, 11227443, 2029473, 11263686, 50384326, 0))

def getInfo(country):
    for coun in countries:
        if coun.name == country:
            return f"{country} has a supply of {coun.supplyMod} Moderna vaccines {coun.supplyPfi} Pfizer vaccines, and {coun.supplyAst} AstraZeneca vaccines. In {country}, {coun.dosedMod} people have been given the Moderna vaccine, {coun.dosedPfi} people have been given the Pfizer vaccine, and {coun.dosedAst} people have been given the AstraZeneca vaccine."
    return f"Sorry, we do not have data on {country} at the moment. Our partners are working hard on getting it. If you have data you would like to share, please send it to WHO@gmail.com."


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['POST'])
def login():
    username = request.get_json(force=True).get('username')
    if not username:
        abort(401)
    password = request.get_json(force=True).get('password')
    if not password:
        abort(401)
    for user in users:
        if user.username == username and user.password == password:
            token = Token(user)
            tokens.append(token)
            return {'token': token.hex}
    #print (f"{username} {password}")
    return {'token': '', 'confirm': True}

@app.route('/register', methods=['POST'])
def register():   
    name = request.get_json(force=True).get('name')
    if not name:
        abort(401)
    email = request.get_json(force=True).get('email')
    if not email:
        abort(401)
    username = request.get_json(force=True).get('username')
    if not username:
        abort(401)
    password = request.get_json(force=True).get('password')
    if not password:
        abort(401)
    user = User(name, email, username, password)
    users.append(user)
    token = Token(user)
    tokens.append(token)
    return {'token': token.hex}

@app.route('/info', methods=['POST'])
def info():
    country = request.get_json(force=True).get('country')
    if not country:
        abort(401)
    username = request.get_json(force=True).get('username')
    if not username:
        abort(401)
    token = request.get_json(force=True).get('token')
    if not token:
        abort(401)
    for tkn in tokens:
        if tkn.user.username == username and tkn.hex == token and (time.time() - tkn.time < 86400):
            return {'info': getInfo(country)}
    return {'info': 'Sorry! It looks like you logged in more than 24 hours ago, or else there was an error with authentication. Please logout and log back in, then try again.'}


if __name__ == '__main__':
    app.run(host='0.0.0.0')
