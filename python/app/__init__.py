from flask import Flask
from flask_cors import CORS
from app.api.routes import configure_routes
from app.services.database import db
from app.utils.logger import setup_logger

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    CORS(app)
    db.init_app(app)

    logger = setup_logger()
    app.logger = logger

    with app.app_context():
        db.create_all()

    configure_routes(app)

    return app
