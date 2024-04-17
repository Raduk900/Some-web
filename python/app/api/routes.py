from flask import request, jsonify
from flask_login import login_user, current_user, LoginManager
from app.services.database import db
from app.models.models import Items, Users
from app.services.auth_service import validate_user
from app.utils.logger import setup_logger

logger = setup_logger()

def configure_routes(app):
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return Users.query.get(int(user_id))

    @app.route('/', methods=['GET'])
    def get():
        logger.debug("Handling GET request to home endpoint.")
        return "Hello Python"

    @app.route('/test-endpoint', methods=['POST'])
    def test_endpoint():
        data = request.json
        logger.debug('Data received: %s', data)
        return jsonify({'message': 'Data received on the backend'}), 200
    
    @app.route('/user-login', methods=['POST'])
    def user_login():
        data = request.json
        logger.debug('Data received: %s', data)
        return jsonify({'message': 'Data received on the backend'}), 200

    @app.route('/items', methods=['POST'])
    def add_item():
        body = request.get_json()
        item = Items(body['title'], body['content'])
        db.session.add(item)
        db.session.commit()
        logger.debug(f"Added new item: {item.title}")
        return "Item added"
    
    @app.route('/users', methods=['POST'])
    def add_user():
        body = request.get_json()
        logger.debug(f"Added new user: {body}")
        if 'name' in body and 'surname' in body and 'email' in body:
            user = Users(name=body['name'], surname=body['surname'], email=body['email'])
            db.session.add(user)
            db.session.commit()
            logger.debug(f"Added new user: {user.name}")
            return "User added"
        
    @app.route('/login', methods=['POST'])
    def login():
        if current_user.is_authenticated:
            return jsonify({'message': 'Already logged in.'}), 200

        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Username and password required.'}), 400

        user = validate_user(username, password)
        if user:
            login_user(user)
            return jsonify({'message': 'Login successful.'}), 200
        else:
            return jsonify({'error': 'Invalid username or password.'}), 401
        
