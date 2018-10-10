#!/usr/bin/env bash

sudo add-apt-repository -y ppa:jonathonf/ffmpeg-3
sudo add-apt-repository -y ppa:jonathonf/python-3.6

sudo apt update

sudo apt-get install -yf python3.6 python-dev python3.6-dev python3.6-venv\
     build-essential libssl-dev libffi-dev \
     libxml2-dev libxslt1-dev zlib1g-dev \
     python-pip libavdevice-dev libavfilter-dev libopus-dev libvpx-dev libx264-dev \
     ffmpeg libav-tools x264 x265

python3.6 -m venv ./visionvenv

source ./visionvenv/bin/activate

python3.6 -m pip install -r ./requirements.txt

