from flask import request, jsonify
from app.services.database import db
from app.models.models import Items
from app.models.models import Users
from app.utils.logger import setup_logger

logger = setup_logger()

def configure_routes(app):

    @app.route('/', methods=['GET'])
    def get():
        logger.debug("Handling GET request to home endpoint.")
        return "Hello Python"

    @app.route('/test-endpoint', methods=['POST'])
    def test_endpoint():
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
