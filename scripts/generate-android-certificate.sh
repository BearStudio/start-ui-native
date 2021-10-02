#!/usr/bin/env bash

cd android/app
keytool -genkey -v -keystore release-key.keystore -alias release-key -keyalg RSA -keysize 2048 -validity 10000
