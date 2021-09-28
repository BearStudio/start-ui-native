#!/usr/bin/env bash

environment=$1
PACKAGE_NAME="com.startuinativeapp"
PROJECT_ROOT=$(pwd)
SCRIPTS_DIR="${PROJECT_ROOT}/scripts"
ANDROID_DIR="${PROJECT_ROOT}/android"

BLUE='\033[1;34m'
ORANGE='\033[0;33m'
NC='\033[0m' # No Color

function bundle {
  # Change environment config
  ./scripts/set-env.sh "${environment}"

  cd "${ANDROID_DIR}" || exit

  # Build the APK
  echo -e "${BLUE}Will start building release bundle...${NC}"
  ./gradlew clean bundleRelease

  cd "${PROJECT_ROOT}" || exit

  # Reset environment config to local
  ./scripts/set-env.sh local
}


# shellcheck disable=SC2162
read -p $'\e[33mDid you remember to update the version number and version code (in android/app/build.gradle) ?\e[0m type enter to validate'

bundle;
