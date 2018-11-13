#!/usr/bin/env bash

sudo apt update

sudo apt-get install -yf python3.6 python-dev python3.6-dev python3.6-venv build-essential

python3 -m venv ./visionvenv

source ./visionvenv/bin/activate

python3 -m pip install requirements.txt

django-admin startproject vision_django

cd vision_django

python manage.py startapp api

