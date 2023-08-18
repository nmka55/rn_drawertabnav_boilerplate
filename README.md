
#  React Native Boilerplate with Navigation, Redux+Persist and UI library.

  

![HeaderImage](front.gif 'HeaderImage')

  

*I made this simple boilerplate to save some time for me in the future. Hope it will help you too.*

**Features:**

 - Based on bare React Native (no expo)
 - Added [react-native-ui-lib](https://wix.github.io/react-native-ui-lib/) with [React Hook Forms](https://react-hook-form.com) for UI elements
 - Dark theme support out of the box. (If you want to add custom color scheme, read RN UI Lib - Colors docs)
 - Configured [React Navigation](https://reactnavigation.org) (nested navigators consist of Native Stack, Drawer and Bottom Tab)
 - Implemented redux store with persist ([reduxjs/toolkit](https://redux-toolkit.js.org) + [react-redux](https://react-redux.js.org) + [MMKV](https://github.com/mrousavy/react-native-mmkv)).
 - Basic authentication flow (shows 2 different navigators depending on Redux Store value)

**To run app:**

 - Run `yarn install` from root of the project
 - Then `cd ios` and run `pod install`
 - Go back to root folder by `cd ..`
 - Run `yarn ios` for iOS Simulator or `yarn android` for Android Emulator

*If you encounter any problmes running these commands, please make sure you went through all installation steps from React Native Getting Started page*
