#!/bin/bash

# VSCode Dev Container for React Project
# Claude v11
# Accounts Pro Project Stop Servers Script
AUTOSTART=false
LOGGING=true
WORKSPACE="/workspaces/accountspro"
cd $WORKSPACE

# Stop Django server if running
if pgrep -f 'manage.py runserver' > /dev/null; then
    echo "Stopping Django server..."
    # Use pkill to stop Django server
    sudo pkill -f 'manage.py runserver'
    echo "Django server stopped.🛑"
else
    echo "Django server is not running.❌"
fi

# Stop Vite server if running
if pgrep -f 'npm run dev' > /dev/null; then
    echo "Stopping Vite server..."
    # Use pkill to stop Vite server
    sudo pkill -f 'npm run dev'
    echo "Vite server stopped.🛑"
else
    echo "Vite server is not running.❌"
fi
