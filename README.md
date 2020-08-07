#   OSRS Raids Finder

##  A full stack MERN web application

This web app is designed specifically for Old School Runescape (OSRS). The biggest problem with [raiding](https://oldschool.runescape.wiki/w/Raids) and bosses in OSRS is finding a team. With the OSRS raids finder you can create a party, visible to anyone else logged into the app, or join a party that was made by someone else. Once you join the party there will be a clan chat listed for everyone to join. The main goal of the app is to allow anyone to quickly find a team for raids or bossing.

## User Process

![Raids Finder Diagram](/client/src/assets/RaidsFinder_Diagram.png "Raids Finder Diagram")

## Dev

### Technology Stack

The web app is being developed using the [MERN](https://www.mongodb.com/mern-stack) (MongoDB, ExpressJs, ReactJs, NodeJs) stack. 

### To get the project up and running for developer work

**You must have Nodejs installed.** You can download it [here](https://nodejs.org/).

1. Clone the repository.

2. run ```npm install``` in the root directory of the project and run ```npm install``` in the ```/client``` directory to install all dependancies.

3. You will need the .env file for connecting to Mongodb and the Json webtoken secret. Once you have the .env file place the file in your root directory of the project.

4. Run ```npm run dev``` in the root directory of the project to concurrently run the backend and front end.

