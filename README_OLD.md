
### Environments

Environments variables are managed thanks to the subfolders in the `environments` folder:

- current: The environment which is effectively used. **Every config import should import from the current subfolder files.**
- local: Your local environment, when developing on your machine
- dev: The environment which can be used for internal testing
- staging: The environment which can be used for alpha testing
- production: The environment for your production app release on the stores

The main advantage to handle environments with subfolders that are copied to a main folder (current), is that you
can add environment dependent files, like Firebase configurations (google-services.json and GoogleService-Info.plist),
that will be copied when you'll release, which is not possible with react-native-dotenv for instance.

## Release

### Android

<p align="center">
  <a href="https://www.android.com/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Android_logo_2019_%28stacked%29.svg/2346px-Android_logo_2019_%28stacked%29.svg.png" alt="Android" width="100" />
  </a>
</p>

#### Generate keystore for release (first time)

To generate a keystore, launch this command:

```./generate-android-certificate.sh```

And then, follow the instructions.

After, you need to update: `STARTUINATIVE_UPLOAD_STORE_FILE`,
`STARTUINATIVE_UPLOAD_KEY_ALIAS`,
`STARTUINATIVE_UPLOAD_STORE_PASSWORD` and
`STARTUINATIVE_UPLOAD_KEY_PASSWORD` constants into `gradle.properties` file.

You can also rename these constants to suits up your project's name.

#### Generate Bundle file for releases on Play Store

We are using [Android App Bundle](https://developer.android.com/platform/technology/app-bundle) on this project. This is a new and more efficient way to package an Android application.

To create the release bundle file use this command:

For development environment:

```bash
yarn android:bundle:dev
```

For staging environment:

```bash
yarn android:bundle:staging
```

For production environment:

```bash
yarn android:bundle:prod
```

Bundle file will be accessible at `android/app/build/outputs/bundle/release/app.aab`

IMPORTANT: Please test the release application with the APK version (next section) on your device before uploading the bundle file on the Play Store.

Then, to send the bundle file generated, please follow this [instructions](https://www.notion.so/bearstudio/D-ployer-une-application-sur-le-PlayStore-78449defdca946eb95be445fbb2b054b).

#### Generate APK for testing release on device

If you want to generate the release APK for testing the release configuration on your device before sending the bundle to the PlayStore, you can use this command:

For development environment:

```
yarn android:build:dev
```

For staging environment:

```
yarn android:build:staging
```

For production environment:

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

##### Apple Silicon (M1) troubleshouting

```bash
sudo arch -x86_64 gem install ffi
yarn ios:install:arm
```

##### Open project on xcode

```bash
open ios/StartUINativeApp.xcworkspace
```

##### Apply config for target environment

For development environment:

```bash
yarn set:config:dev
```

For staging environment:

```bash
yarn set:config:staging
```

For production environment:

```bash
yarn set:config:prod
```

##### Important note about Info.plist

With the evolutions on the project, if you need to update Info.plist, please update all Info.plist in config folder.

## Change App Name

When you need to change app name and to remove "Start UI Native" references, please use this library:

https://www.npmjs.com/package/react-native-rename

Example of renaming:

```bash
npx react-native-rename "Travel App"
```


## Change App Icons

### For Android

Please use this online tool to generate the icon files for Android:

https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

Download the zip generated and extract it into `android/app/src/main/res/`.

### For iOS

For iOS, you have to generate images with different sizes. To do it, you can use this tool for MacOS: https://apps.apple.com/au/app/icon-set-creator/id939343785?mt=12

Or this tool online: https://appicon.co/

(Tools not tested)

And then, import these images into a new image assets into xcode. Please follow this tutorial as an example: https://medium.com/@craiggrummitt/xcode-whats-up-with-app-icons-308b3f10e942
