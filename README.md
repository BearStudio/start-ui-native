# Start UI Native

Opinionated React Native UI starter with
- ⚛️ [React Native](https://reactnative.dev/)
- ⚛️ [React Navigation](https://reactnavigation.org/)
- 🔺 [Magnus UI](https://magnus-ui.com/)
- ⚛️ [React Query](https://react-query.tanstack.com/)
- 🐜 [Formiz](https://formiz-react.com/)

ℹ️ API calls are mapped on a [jHipster](https://www.jhipster.tech/) backend application.

<a href="https://www.jhipster.tech/">
  <img src="https://fr.ippon.tech/jhipster/img-jhipster.jpg?language_id=1591305318214" alt="jHipster logo" width="200" />
</a>

## Table of contents

1. [Installation](#installation)
2. [Development](#development)
3. [Release](#release)
4. [Change App Name](#change-app-name)
4. [Change App Icons](#change-app-icons)

## Installation

```
yarn install
```

## Development

### Configuration

You need to install Android Studio, one Android SDK and adb tools on your computer to develop on the project for Android devices. And you need a Mac and Xcode installed on it to develop on the project for iOS devices.

<p align="center">
  <a href="https://developer.android.com/studio?authuser=1">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Android_Studio_icon.svg/1200px-Android_Studio_icon.svg.png" alt="Android Studio" width="80" />
  </a>

  <a href="https://developer.apple.com/xcode/">
    <img src="https://www.swiftement.fr/wp-content/uploads/2018/04/xcode.png" alt="Xcode" width="80" />
  </a>
</p>

### Start the project

 - First, install dependencies with `yarn`
 - Start the development server `yarn start`
 - Finally, launch application on your device with `yarn android` on android or `yarn ios` on iOS

### Environments

Environments variables are managed with [react-native-dotenv](https://github.com/zetachang/react-native-dotenv) : 

- Local : `.env.local`
- Dev : `.env.dev`
- Staging : `.env.staging`
- Production : `.env.prod`

## Release

### Android

<p align="center">
  <a href="https://www.android.com/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Android_logo_2019.svg" alt="Android" width="100" />
  </a>
</p>

#### Generate keystore for release (first time)

To generate a keystore, launch this command :

```./generate-android-certificate.sh```

And then, follow the instructions.

After, you need to update : `STARTUINATIVE_UPLOAD_STORE_FILE`,
`STARTUINATIVE_UPLOAD_KEY_ALIAS`,
`STARTUINATIVE_UPLOAD_STORE_PASSWORD` and
`STARTUINATIVE_UPLOAD_KEY_PASSWORD` constants into `gradle.properties` file.

You can also rename these constants to suits up your project's name.

#### Generate Bundle file for releases on Play Store

We are using [Android App Bundle](https://developer.android.com/platform/technology/app-bundle) on this project. This is a new and more efficient way to package an Android application.

To create the release bundle file use this command :

For development environment :

```
yarn android:bundle:dev
```

For staging environment :

```
yarn android:bundle:staging
```

For production environment :

```
yarn android:bundle:prod
```

Bundle file will be accessible at `android/app/build/outputs/bundle/release/app.aab`

IMPORTANT : Please test the release application with the APK version (next section) on your device before uploading the bundle file on the Play Store.

Then, to send the bundle file generated, please follow this [instructions](https://www.notion.so/bearstudio/D-ployer-une-application-sur-le-PlayStore-78449defdca946eb95be445fbb2b054b).

#### Generate APK for testing release on device

If you want to generate the release APK for testing the release configuration on your device before sending the bundle to the PlayStore, you can use this command :

For development environment :

```
yarn android:build:dev
```

For staging environment :

```
yarn android:build:staging
```

For production environment :

```
yarn android:build:prod
```

The APK will be accessible at `android/app/build/outputs/apk/release/app-release.apk` and will be installed on your device connected.

### iOS

<p align="center">
  <a href="https://www.apple.com/fr/ios">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/IOS_logo.svg/1200px-IOS_logo.svg.png" alt="iOS" width="100" />
  </a>
</p>

#### Instructions

##### Install dependencies

```
yarn
```

```
cd ios/
pod install
```

##### Open project on xcode

```
open ios/StartUINativeApp.xcworkspace
```

##### Apply config for target environment

For development environment :

```
yarn set:config:dev
```

For staging environment :

```
yarn set:config:staging
```

For production environment :

```
yarn set:config:prod
```

##### Important note about Info.plist

With the evolutions on the project, if you need to update Info.plist, please update all Info.plist in config folder.

## Change App Name

When you need to change app name and to remove "Start UI Native" references, please use this library :

https://www.npmjs.com/package/react-native-rename

Example of renaming :

```npx react-native-rename "Travel App"```


## Change App Icons

### For Android

Please use this online tool to generate the icon files for Android :

https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

Download the zip generated and extract it into `android/app/src/main/res/`.

### For iOS

For iOS, you have to generate images with different sizes. To do it, you can use this tool for MacOS : https://apps.apple.com/au/app/icon-set-creator/id939343785?mt=12

Or this tool online : https://appicon.co/

(Tools not tested)

And then, import these images into a new image assets into xcode. Please follow this tutorial as an example : https://medium.com/@craiggrummitt/xcode-whats-up-with-app-icons-308b3f10e942
