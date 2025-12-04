# Local development settings - not tracked by git
from .settings import *

# Use MySQL with your team's schema
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'sql_study_room',
        'USER': 'root',
        'PASSWORD': 'MrDog!123',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

# Add local CORS origins
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000", 
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8001",
    "http://127.0.0.1:8001",
]