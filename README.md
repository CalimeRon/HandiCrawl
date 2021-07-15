# <img src="https://user-images.githubusercontent.com/65477545/125166371-0e8deb00-e1a4-11eb-99c3-312354704932.png" width="100"> HandiCrawl        


<p>
<img src="https://badgen.net/badge/Language/Javascript/blue/"/>
<img src="https://badgen.net/badge/Front%20End/React%20Native/blue/"/>
<img src="https://badgen.net/badge/Back%20End/Google%20Firebase/blue/"/>
</p>

Handicrawl is a collaborative App aimed at facilitating motor-disabled persons to move around in any part of the world.
The app consist of a map that users can populate with accessibility icons to help inform about the easiness of access of a given space or building.

The app was built in one week, using [Expo](https://expo.io/) on the front-end and [Google Firebase](https://firebase.google.com/) as a back-end suppost. It is still under active development

![handi-crawl-mocks](https://user-images.githubusercontent.com/65477545/125168776-c248a800-e1af-11eb-8414-f156bd2a133e.png)


## Demo

|  **App opening** | **Information screen**  | **Adding a marker** | **Modifying inaccurate marker** |
| :---------: | :---------: | :---------: | :---------:  |
| <img src="https://user-images.githubusercontent.com/65477545/125168165-b5768500-e1ac-11eb-9481-364d05fb05dd.gif" height="400"> |  <img src="https://user-images.githubusercontent.com/65477545/125168662-3b93cb00-e1af-11eb-90fb-67c27cf37f62.gif" height="400">       |     <img src="https://user-images.githubusercontent.com/65477545/125168800-e0aea380-e1af-11eb-8de6-b651d801a84a.gif" height="400">   | <img src="https://user-images.githubusercontent.com/65477545/125168913-7a765080-e1b0-11eb-9a45-414c45abf95a.gif" height="400"> |


## Getting Started
- You need a Google Firestore database set-up. Put the required keys and IDs as shown in the .env example file. Don't forget to allow write/read in the rules.
- (If you prefer to use another database, you will need to heavily modify **apiService.js** as well as **databaseConnection.js**)
- Download Expo on your mobile (Android/ iOS)
- Run ```npm i``` on the client folder
- Run ```expo start```
- Scan the QR code from the mobile Expo App
- Enjoy !

## Future features
- User authentication 
- User engagement system
- Broadening of the app spectrum to be an accessibility Hub 


## Contributors
An immense thanks to [Viktor](https://github.com/vikvikvr) and [Ian](https://github.com/Rankz) for [refactoring and testing the app](https://github.com/vikvikvr/HandiCrawl)
