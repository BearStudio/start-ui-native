#!/usr/bin/env bash

environment=$1
PACKAGE_NAME="com.startuinativeapp"
PROJECT_ROOT=$(pwd)
SCRIPTS_DIR="${PROJECT_ROOT}/scripts"
ANDROID_DIR="${PROJECT_ROOT}/android"
ANDROID_RELEASES_DIR="${ANDROID_DIR}/app/build/outputs/apk/release"

BLUE='\033[1;34m'
ORANGE='\033[0;33m'
NC='\033[0m' # No Color

function build {
  # Change environment config
  ./scripts/set-env.sh "${environment}"

  # Uninstall previous APK
  echo "Uninstalling ${PACKAGE_NAME}... apk from device"
  adb shell pm uninstall ${PACKAGE_NAME}

  cd "${ANDROID_DIR}" || exit

  # Build the APK
  echo -e "${BLUE}Will start building release apk...${NC}"
  ./gradlew clean assembleRelease

  # Install apk on the device
  echo -e "${BLUE}Installing release apk on device...${NC}"
  adb install "${ANDROID_RELEASES_DIR}"/app-release.apk

  cd "${PROJECT_ROOT}" || exit

  # Reset environment config to local
  ./scripts/set-env.sh local
}


# shellcheck disable=SC2162
read -p $'\e[33mDid you remember to update the version number and version code (in android/app/build.gradle) ?\e[0m type enter to validate'

build;
