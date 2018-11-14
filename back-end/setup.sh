#!/usr/bin/env bash

sudo apt update

sudo apt-get install -yf python3.6 python-dev python3.6-dev python3.6-venv build-essential postgresql postgresql-contrib

python3 -m venv ./visionvenv

source ./visionvenv/bin/activate

python3 -m pip install -r requirements.txt

