#!/usr/bin/env bash
set -e # The script will exit if a part of it fails

environment=$1

# Set the env config
rm -rf src/environment
cp -r environments/"${environment}" src/environment

echo -e "${GREEN}Successfully copied project ${environment} environment config${NC}"
