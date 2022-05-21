## TEST APP

### Instructions to run the project

#### Pre-requisites

1. Set up a firebase project [Here](https://firebase.google.com)
2. Download google-services.json file and follow these- [Instructions](https://rnfirebase.io/#generating-android-credentials)

### Project setup

1. clone repo:

   ```
   $ git clone https://github.com/Kazion500/test-app.git
   ```

2. install packages:
   ```
   $ yarn install
   ```
3. run the project
   ```
   $ yarn android
   ```

NOTE: Make sure the emulator has google play services before starting the app else authentication will not work. Also make sure to add webClient id in the authReducer file.
