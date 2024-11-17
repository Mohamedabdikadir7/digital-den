from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Configuring SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///computers_shop.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define Models for each table
class Monitor(db.Model):
    __tablename__ = 'monitors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    price = db.Column(db.String(255))
    description = db.Column(db.Text)
    img_url = db.Column(db.String(500))

class Laptop(db.Model):
    __tablename__ = 'laptops'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    price = db.Column(db.String(255))
    description = db.Column(db.Text)
    img_url = db.Column(db.String(500))

class Phone(db.Model):
    __tablename__ = 'phones'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)

class Accessory(db.Model):
    __tablename__ = 'accessories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    price = db.Column(db.String(255))
    description = db.Column(db.Text)
    img_url = db.Column(db.String(500))

class Macbook(db.Model):
    __tablename__ = 'macbooks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    price = db.Column(db.String(255))
    description = db.Column(db.Text)
    img_url = db.Column(db.String(500))

class GamingCPU(db.Model):
    __tablename__ = 'gaming_cpus'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    price = db.Column(db.String(255))
    description = db.Column(db.Text)
    img_url = db.Column(db.String(500))

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(255))
    secondname = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)  # Ensure email is unique
    password_hash = db.Column(db.String(255))  # Store hashed password


class Seller(db.Model):
    __tablename__ = 'sellers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    id_number = db.Column(db.String(50), nullable=False)
    business_type = db.Column(db.String(255), nullable=True)  # Ensure this field exists
  


# Welcome route
@app.route('/', methods=['GET'])
def welcome():
    return "<h1>Welcome to my Flask App!</h1><p>Visit /monitors, /laptops, /accessories, /macbooks, /gaming_cpus or /phones to get the data.</p>"

# Endpoints for fetching data
@app.route('/monitors', methods=['GET'])
def get_monitors():
    monitors = Monitor.query.all()
    return jsonify([{
        'id': monitor.id,
        'name': monitor.name,
        'price': monitor.price,
        'description': monitor.description,
        'img_url': monitor.img_url
    } for monitor in monitors])

@app.route('/phones', methods=['GET'])
def get_phones():
    phones = Phone.query.all()
    return jsonify([{
        'id': phone.id,
        'name': phone.name,
        'price': phone.price,
        'description': phone.description,
        'img_url': phone.image_url
    } for phone in phones])

@app.route('/laptops', methods=['GET'])
def get_laptops():
    laptops = Laptop.query.all()
    return jsonify([{
        'id': laptop.id,
        'name': laptop.name,
        'price': laptop.price,
        'description': laptop.description,
        'img_url': laptop.img_url
    } for laptop in laptops])

@app.route('/accessories', methods=['GET'])
def get_accessories():
    accessories = Accessory.query.all()
    return jsonify([{
        'id': accessory.id,
        'name': accessory.name,
        'price': accessory.price,
        'description': accessory.description,
        'img_url': accessory.img_url
    } for accessory in accessories])

@app.route('/macbooks', methods=['GET'])
def get_macbooks():
    macbooks = Macbook.query.all()
    return jsonify([{
        'id': macbook.id,
        'name': macbook.name,
        'price': macbook.price,
        'description': macbook.description,
        'img_url': macbook.img_url
    } for macbook in macbooks])

@app.route('/gaming_cpus', methods=['GET'])
def get_gaming_cpus():
    gaming_cpus = GamingCPU.query.all()
    return jsonify([{
        'id': cpu.id,
        'name': cpu.name,
        'price': cpu.price,
        'description': cpu.description,
        'img_url': cpu.img_url
     } for cpu in gaming_cpus])

# User registration endpoint
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    firstname = data.get('firstname')
    secondname = data.get('secondname')
    email = data.get('email')
    password_hash = generate_password_hash(data.get('password'))

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists!'}), 400

    new_user = User(firstname=firstname, secondname=secondname, email=email, password_hash=password_hash)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully!'}), 201
    except Exception as e:
        return jsonify({'message': 'Error registering user: {}'.format(str(e))}), 500

# Seller registration endpoint
@app.route('/register_seller', methods=['POST'])
def register_seller():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    id_number = data.get('id_number')
    business_type = data.get('business_type')

    if Seller.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists!'}), 400

    new_seller = Seller(name=name, email=email, phone_number=phone_number, id_number=id_number, business_type=business_type)
    try:
        db.session.add(new_seller)
        db.session.commit()
        return jsonify({'message': 'Seller registered successfully!'}), 201
    except Exception as e:
        return jsonify({'message': 'Error registering seller: {}'.format(str(e))}), 500

# Ensure tables are created
with app.app_context():
    db.create_all()

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
CORS(app, origins=["http://localhost:3000"], methods=["GET", "POST", "OPTIONS"])