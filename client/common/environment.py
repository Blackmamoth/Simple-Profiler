from dotenv import load_dotenv
import os

load_dotenv()


class Environment:
    APP_MEDIA_PATH = os.environ.get('APP_MEDIA_PATH')
    MONGO_HOST = os.environ.get('MONGO_HOST')
    MONGO_PORT = int(os.environ.get('MONGO_PORT'))
    MONGO_DATABASE = os.environ.get('MONGO_DATABASE')
    MONGO_COLLECTION = os.environ.get('MONGO_COLLECTION')
