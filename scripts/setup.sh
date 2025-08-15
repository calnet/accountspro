#!/bin/bash

# VSCode Dev Container for React Project
# Claude v19

# Accounts Pro Project Setup Script
echo "🚀 Starting Accounts Pro development environment setup..."

sudo rm -rf /workspaces/accountspro/frontend/node_modules
sudo chown -hR appuser:appuser /workspaces/accountspro/frontend
sudo chown -hR appuser:appuser /workspaces/accountspro/backend
sudo chown -h appuser:appuser /workspaces/accountspro/*

# Update package manager
sudo apk update
sleep 5
# Install required packages
sudo apk add --no-cache curl git sqlite sudo bash nodejs npm apt
sleep 10
# Ensure we're in the workspace directory
cd /workspaces/accountspro

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
if [ -f "frontend/package.json" ]; then
    cd frontend
    echo "Installing frontend dependencies..."
    npm ci
    cd ..
    echo "✅ Node.js dependencies installed successfully"
else
    echo "⚠️  No frontend/package.json found, skipping npm install"
fi

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
pip install --upgrade pip
sleep 5

if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    sleep 5
    echo "✅ Python dependencies installed successfully"
else
    echo "⚠️  No requirements.txt found, skipping pip install"
fi

echo "🎉 Accounts Pro development environment setup complete!"
echo "Ready for development! 🔥"

echo "Servers will start automatically when the container starts."

echo "Manual commands:"
echo "1. Django server: cd backend && python manage.py runserver 0.0.0.0:8000"
echo "2. Vite server: cd frontend && npm run dev -- --host 0.0.0.0 --port 5173"