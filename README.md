# 🚀 Start-UI [native-expo]

🚀 Start UI [native] is a opinionated [Expo](https://expo.dev/) starter repository created & maintained by the [BearStudio Team](https://www.bearstudio.fr/team) and other contributors.
It represents our team's up-to-date stack that we use when creating React Native apps for our clients.

This starter is oriented to use Expo with Expo EAS features to have fully access to native code.

---

## Technology

- 🚀 [Expo](https://expo.dev/)
- 📱 [Expo EAS](https://expo.dev/eas)
- ⚛️ [Expo Router](https://expo.github.io/router/docs/)
- 🔺 [Magnus UI](https://magnus-ui.com/)
- ⚛️ [TanStack Query](https://react-query.tanstack.com/)
- 🐜 [Formiz](https://formiz-react.com/)
- ↔ [Axios](https://github.com/axios/axios)

---

## Installation 

```bash
yarn
yarn start
# Platform choice
# Accept to pull development build
```

---

## Update .env values 

Put your env values on .env file. Environment variables inserted on your local machine or on Expo EAS platform will overwrite the variables of .env file.

```bash
API_URL='your api url here'
```

---

## Create a EAS development build

⚠️ To do only if no development build on date with native code is available

```bash
# ios
eas build --profile development --platform ios
# android
eas build --profile development --platform android
```

---

## Build native locally

If you want to build locally the application (with native layer) follow those steps :

### Android

<img src="https://emojis.slackmojis.com/emojis/images/1493026598/2124/android.png" width="60" />

You need to install Android Studio and Android SDK on your computer to be able to build locally the application
without using EAS build.

```bash
npx expo run:android
```

The application will start on your device or on an android simulator.

### iOS

<img src="https://emojis.slackmojis.com/emojis/images/1623622435/44818/ios.png" width="60" />

You need to install XCode on your Mac to be able to build locally the application
without using EAS build.

```bash
npx expo run:ios
```

The application will start on your device or on an iOS simulator.

---

## Create a EAS production build

For publishing 

```bash
# ios
eas build --profile production --platform ios
# android
eas build --profile production --platform android
```