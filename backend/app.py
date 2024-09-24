from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configure SQLite database connection (you can switch to MySQL later if needed)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///computers_shop.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
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

# Welcome route
@app.route('/', methods=['GET'])
def welcome():
    return "<h1>Welcome to my Flask App!</h1><p>Visit /monitors, /laptops, /accessories, /macbooks, or /gaming_cpus to get the data.</p>"

# Endpoint to fetch all monitors
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

# Endpoint to fetch all laptops
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

# Endpoint to fetch all accessories
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

# Endpoint to fetch all macbooks
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

# Endpoint to fetch all gaming CPUs
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


# Ensure that tables are created in the database
with app.app_context():
    db.create_all()

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
