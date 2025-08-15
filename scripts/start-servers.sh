#!/bin/bash

# VSCode Dev Container for React Project
# Claude v11

# Accounts Pro Project Start Servers Script
WORKSPACE="/workspaces/accountspro"
cd $WORKSPACE
# Start Vite server in background with nohup
sh $WORKSPACE/scripts/start-frontend.sh
sleep 5
# Start Django server in background with nohup
sh $WORKSPACE/scripts/start-backend.sh
# Test servers
sleep 5
sh $WORKSPACE/scripts/test-servers.sh
# Keep script running
wait