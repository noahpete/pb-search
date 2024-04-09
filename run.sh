#!/bin/bash

python3.12 -m venv env
source env/bin/activate
python3 -m pip install -r requirements.txt

# Navigate to the backend directory
cd backend || exit

# Run the Django development server
python3 manage.py runserver &

# Navigate back to the parent directory
cd ..

# Navigate to the frontend directory
cd frontend || exit

# Run the React development server
npm run dev