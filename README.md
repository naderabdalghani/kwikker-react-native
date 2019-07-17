# Kwikker

[![Compilation.png](https://i.postimg.cc/sgMj7GFY/Compilation.png)](https://postimg.cc/QFrZrtdC)

Don't you wish that Twitter were more... Kwikker? Say no more! We've got your back with our ultra enhanced version of one of the most used social media platforms.*

## Basic Setup

- Setup the react native environment using this [link][link1], make sure that you select 'React Native CLI Quickstart' 
- Clone the project
- Run `npm install` or `yarn` to install required node modules
- Prepare your android device using [these][link2] instructions
- Run `react-native run-android` inside the project directory (Kwikker/)

## Mock Service Setup

- Setup JSON server using this [link][link3]
- Start JSON server using this command `json-server --watch db.json`
- Modify the default base URL in Kwikker/index.js
- For some reason, sometimes JSON server isn't correctly linked to your mobile device, which causes the application to infinitly load requested data such as notifications, direct messages, ...etc, if this problem presists, run this command `adb reverse tcp:3000 tcp:3000`, note that 3000 is your server port, it could be a different number

## Running tests

- Run `yarn test`

## Documentation

- Functions documentation are located in Kwikker/docs/index.html

*This application isn't by any means intended for public or commerical use, it's merely a school project, so please don't sue us, thanks for understanding

[link1]: <https://facebook.github.io/react-native/docs/getting-started>
[link2]: <https://facebook.github.io/react-native/docs/getting-started#preparing-the-android-device>
[link3]: <https://github.com/typicode/json-server>
