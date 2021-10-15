<h1 align="center"><img src="assets/start-ui-native.svg" alt="Start UI Native" width="300" /></h1>

🚀 Start UI [native] is a opinionated [React Native](https://reactnative.dev/) starter repository created & maintained by the [BearStudio Team](https://www.bearstudio.fr/team) and other contributors.
It represents our team's up-to-date stack that we use when creating React Native apps for our clients.

## Getting Started

```bash
npx create-start-ui --native myApp
```
That will scaffold a new folder with the latest version of 🚀 Start UI <small>[native]</small> 🎉

Then just go to the created folder `cd myApp` and follow the [Installation Guide](#installation).

---

## Technology

- ⚛️ [React Native](https://reactnative.dev/)
- ⚛️ [React Navigation](https://reactnavigation.org/)
- ⬢ [Native Base 3](https://nativebase.io/)
- ⚛️ [React Query](https://react-query.tanstack.com/)
- 🐜 [Formiz](https://formiz-react.com/)
- ↔ [Axios](https://github.com/axios/axios)

ℹ️ API calls are mapped on a [jHipster](https://www.jhipster.tech/) backend application.

---

## Installation

1. Install project dependencies
```bash
yarn install
```
2. Set up your local environment config
   1. Copy the `environments/dev/config.js` in the `environments/local` folder
   2. Replace the `ENV: ENVS.DEV,` line with `ENV: ENVS.LOCAL,` within the `environments/local/config.js` file.
   3. Run the `yarn set:env:local` command.

3. Then follow the [Android Installation Guide](#android-installation) or [iOS Installation Guide](#ios-installation).

---

## Android

<img src="https://emojis.slackmojis.com/emojis/images/1493026598/2124/android.png" width="60" align="right" />

### Android Installation

1. Follow the "Installing dependencies" of [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup) for Android

### Android Development

1. Run the development server
```bash
yarn dev
```

2. In another terminal

```bash
yarn android
```

### Android Release

#### Generate keystore

The first time you will release your app, you will need to generate a keystore
```bash
./scripts/generate-android-certificate.sh
```
And then, follow the instructions.

Then, you need to update the `RELEASE_KEY_STORE_PASSWORD` and `RELEASE_KEY_PASSWORD` into the `android/gradle.properties` file.

> You should not keep this in the git history. Use a password manager or other secured solution to keep this file.
> ⚠️ DO NOT LOOSE IT. YOU WILL NOT BE ABLE TO RELEASE YOUR APP.

#### Generate Bundle file for releases on Play Store

We are using [Android App Bundle](https://developer.android.com/platform/technology/app-bundle) on this project. This is a new and more efficient way to package an Android application.

Based on the environment that you need to target run one of the following command:
```bash
yarn android:bundle:dev
# or
yarn android:bundle:staging
# or
yarn android:bundle:prod
```

The Bundle file will be available at `android/app/build/outputs/bundle/release/app.aab`

> ⚠️ You can test the release application with the APK version (next section) on your device before uploading the bundle file on the Play Store (Especially for production release).

#### Generate APK for testing release on device

If you want to generate the release APK for testing the release configuration on your device before sending the bundle to the PlayStore, you can use one of the following commands based on the target environment:

```bash
yarn android:build:dev
# or
yarn android:build:staging
# or
yarn android:build:prod
```

The APK will be available at `android/app/build/outputs/apk/release/app-release.apk` and will be installed on your connected device.

---

## iOS

<img src="https://emojis.slackmojis.com/emojis/images/1623622435/44818/ios.png" width="60" align="right" />

For iOS development you need to be on a Apple computer with macOS.

### iOS Installation

1. Follow the "Installing dependencies" of [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup) for iOS

For Apple chips (M1) also run the following command
```bash
sudo arch -x86_64 gem install ffi
```

1. Install pods

| Processor type           | Command line             |
|--------------------------|--------------------------|
| Intel chip               | `yarn ios:install:intel` |
| Apple chip (M1)          | `yarn ios:install:arm`   |

### iOS Development

1. Run the development server
```bash
yarn dev
```

2. In another terminal

```bash
yarn ios:open
```
This will open the project in Xcode.

3. Click on the "Play" button on Xcode.

### iOS Release

1. Setup your targeted environment
```bash
yarn set:env:dev
# or
yarn set:env:staging
# or
yarn set:env:prod
```

2. Open Xcode
```bash
yarn ios:open
```

3. Follow the [Publishing to Apple App Store](https://reactnative.dev/docs/publishing-to-app-store) documentation.

### Important note about Info.plist

With the evolutions on the project, if you need to update `Info.plist`, please update all `Info.plist` in all `ios` subfolders.


---
## Environments

Environments variables are managed thanks to the subfolders in the `environments` folder:

- **local:** Your local environment, when developing on your computer
- **dev:** For your app internal testing
- **staging:** For your app alpha/beta/testflight testing
- **production:** For your production app release on the stores

> This approche allows us to have dependent environment files, like Firebase configurations (google-services.json and GoogleService-Info.plist), that will be copied when you'll release, which is not possible with react-native-dotenv for instance.

You can switch environment with one of the following commands:
```bash
yarn set:env:local
# or
yarn set:env:dev
# or
yarn set:env:staging
# or
yarn set:env:prod
```

---

## Devtools

We provide some devtools that can be accessed from the dev menu.
You can open it by typing <key>d</key> on the `yarn dev` console.

You will find the following tools:
- Storybook
- Network helper

## Updating the Application Name

When you need to update the application name and to remove "Start UI Native" references, please use this library:

[react-native-rename](https://www.npmjs.com/package/react-native-rename)

```bash
npx react-native-rename "My Amazing App"
```

## Updating the Application Icons

### Application Icons for Android

You can use [Launcher icon generator](nurik.github.io/AndroidAssetStudio/icons-launcher.html) online tool to generate the icon files for Android:

Download and extract the .zip file it into `android/app/src/main/res/` folder.

### Application Icons for iOS

For iOS, you can use [Icon Set Creator](https://apps.apple.com/au/app/icon-set-creator/id939343785) for MacOS.

[https://appicon.co/](https://appicon.co/) online tool.

And then, import these images into a new image assets into xcode. You can follow [this tutorial for example](https://medium.com/@craiggrummitt/xcode-whats-up-with-app-icons-308b3f10e942).
