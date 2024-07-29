#!/bin/bash

cd frontend-react-ts
yarn install --frozen-lockfile --silent
cd ..

cd backend-lambda-apollo-ts
yarn install --frozen-lockfile --silent
cd ..

cd backend-ecs-fastapi-py
pip3 install -r ./requirements.txt
cd ..

