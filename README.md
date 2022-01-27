# Kvell App

## Get started

### Installation

```sh
npm ci
```

### Usage

#### Metro Server

```sh
npm start -- --reset-cache

```

#### App ios

```
react-native run-ios or npx react-native run-ios
```

#### App android

```
react-native run-android or npx react-native run-android
```

#### IOS Deployment

```
- Icrement build number by 1 on Xcode -> General -> Identity
- Under Devices (Where the simulator is selected) select "Any IOS device"
- Press CMD + SHIT + B (To create a build)
- Then on Xcode select Product -> Archive
- Click "next" on all the options and finally "upload"
- Once it appears on the Testflight platform, wait a few minutes untils it appears as "Ready to test"
- Click the "Manage" link that appears on the right side of the build version number and click "No"
- Done, just notify the team and don't cry if there's a bug storm comming your way, its normal at this stage.
```

#### Common issues and manual fixes

### Raygun logger

if the app its not compiling on release mode make sure the following code is commented on the raygun package

```
- go to: node modules -> raygunRreactnative -> dist
- open RaygunClient.js and RealUserMonitor.js
- on both files look for and comment the lines that contain the following code: RaygunLogger_1.default.d
```
