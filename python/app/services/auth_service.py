from werkzeug.security import check_password_hash
from app.models.models import Users

def validate_user(username, password):
    user = Users.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        return user
    return None
