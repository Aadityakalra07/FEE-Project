#!/bin/bash

# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..

# Build React app
npm run build

echo "Build completed successfully!"
