# ReligousDiscourse

## **Frontend Development**
 
### Prerequisites

    React Native:
        Install Node.js and NPM (Node Package Manager):
        Download and install the latest LTS version of Node.js from https://nodejs.org/en/w

    Install Expo CLI:
        npm install -g expo-cli

<br>

### Usage

Navigate to the `/App` directory and call `expo start` to launch the UI. The first time calling it, it will install the requisite node packages. 

Upon running `expo start` you will be prompted to choose how to render the UI. the `web` version should work out of the box, but the `ios` version may require additional installation on an ios simulator.

<br>

### Deployment

Requires the `Expo Application Service (eas)` to be installed `npm install eas`

To build a new version of the app, navigate to `/App` and call `eas build --platform ios`

If the build is successful, it can be submitted to App Store Connect with `eas submit -p ios --latest`

*Note: These commands requires a sign in to the `cornkak@gmail.com` appleID to execute*

<br>
<br>

## **Backend Development**

### Prerequisites

    Install VirtualEnv with Python: 
    https://help.dreamhost.com/hc/en-us/articles/115000695551-Installing-and-using-virtualenv-with-Python-3

    Or with Pip:
        pip install virtualenv

<br>

### Usage


**Source Virtual Environment**

From the root directory, run `source venv/bin/activate`

**Run locally**

run `python Backend/applicaiton.py` and set `localDevelopment = true` in the Debate.js file

**Deploy new backend**

Navigate to `/Backend` and run `zappa update production`

*Note: This requires zappa aws iam role credentials and region to be set in the `~/.aws/credentials` and `~/.aws/config` files respectively. Additionally an uncommitted `zappa_settings.json` file is required to deploy (uncommitted because it contains secrets).*
