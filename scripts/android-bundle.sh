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
  cp .env."${environment}" .env

  cd "${ANDROID_DIR}" || exit

  echo -e "${BLUE}Bundling app...${NC}"
  react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output app/src/main/assets/index.android.bundle --assets-dest app/src/main/res

  #  # This is to delete duplicates file that break the build
  #  rm -rf app/src/main/res/drawable-xxxhdpi app/src/main/res/drawable-xxhdpi app/src/main/res/drawable-xhdpi app/src/main/res/drawable-mdpi app/src/main/res/drawable-hdpi

  # Build the APK
  echo -e "${BLUE}Will start building release bundle...${NC}"
  ./gradlew clean bundleRelease

  cd "${PROJECT_ROOT}" || exit

  # Reset environment config to local
  cp .env.local .env
}


# shellcheck disable=SC2162
read -p $'\e[33mDid you remember to update the version number and version code (in android/app/build.gradle) ?\e[0m type enter to validate'

bundle;
