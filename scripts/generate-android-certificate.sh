#!/usr/bin/env bash

cd android/app
keytool -genkey -v -keystore startuinative-key.keystore -alias startuinative-key -keyalg RSA -keysize 2048 -validity 10000
