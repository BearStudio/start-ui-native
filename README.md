<h1 align="center"><img src="assets/thumbnail.png" alt="Start UI Native" /></h1>

> [!CAUTION]  
> This project is in WIP status, use it carrefully, it's not ready for production.  
> We are currently updating a lot of things on the starter (screens, api, ...) in order to make it stable and usefull.  
> StartUI [native] needs StartUI [web] v2 in order to work correctly.  
> Make sure to have a local/deployed installation of StartUI [web] v2 before using
> StartUI [native].

🚀 Start UI [native] is a opinionated [Expo](https://expo.dev/) starter repository created & maintained by the [BearStudio Team](https://www.bearstudio.fr/team) and other contributors.
It represents our team's up-to-date stack that we use when creating React Native apps for our clients.

This starter is oriented to use Expo with Expo EAS features to have full access to native code.

---

## Technology

- 🚀 [Expo](https://expo.dev/)
- 📱 [Expo EAS](https://expo.dev/eas)
- ⚛️ [Expo Router](https://expo.github.io/router/docs/)
- 🌿 [Ficus UI](https://ficus-ui.com/)
- ⚛️ [TanStack Query](https://react-query.tanstack.com/)
- 🐜 [Formiz](https://formiz-react.com/)
- ↔ [Zodios](https://www.zodios.org/)

---

## Getting Started

### Prerequisites

This app is using Expo Go with [Expo development builds](https://docs.expo.dev/workflow/overview/#development-builds). In order to launch the app, you will need to install android and ios tooling:

#### Android

See https://reactnative.dev/docs/environment-setup?guide=native&platform=android

#### iOS

See https://reactnative.dev/docs/environment-setup?guide=native&platform=ios

### Update .env values

Put your env values on .env file. Environment variables inserted on your local machine or on Expo EAS platform will overwrite the variables of .env file.

```bash
# Env var used to call api endpoints — generally it will be your start-ui-web api url
API_URL='your api url here'

# Env var used to get the open api file, used to generate zodios client
OPEN_API_URL='your open api api url here'
```

### Installation

```bash
# Install dependencies and generate api client
yarn

# Then, choose based on the platform you want to dev on:
yarn android # Launch on your android device if detected, or an Android emulator
yarn ios     # Launch on your iOS device if detected, or an iOS emulator
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

## Create a EAS production build

For publishing

```bash
# ios
eas build --profile production --platform ios
# android
eas build --profile production --platform android
```