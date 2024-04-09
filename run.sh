#!/bin/bash

python3.12 -m venv env
source env/bin/activate
python3 -m pip install -r requirements.txt

cd backend || exit
python3 manage.py runserver &

cd ..
cd frontend || exit

npm install
npm run dev