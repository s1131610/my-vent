#myVent Angular 11

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/myvent-fake-backend-login)

## Install Angular CLI and VS Code

[Using Angular in Visual Studio Code] (https://code.visualstudio.com/docs/nodejs/angular-tutorial)
[nodejs download](https://nodejs.org/en/)
[vscode download](https://code.visualstudio.com/Download)

- Create angular folder
- Download NodeJs and extract unto angular folder
- Download Visual Studio Code and extract into angular folder
- Create env.sh to set PATH
- Open Git Bash terminal
- cd angluar
- source env.sh
- npm install -g @angular/cli

## Setup Environment

Perform the following steps to start the Angular CLI environment. 

NOTE: The env.sh file sets PATH to include VS Code and NodeJs 

- Open Git Bash terminal
- cd angluar
- source env.sh
- cd my-vent/src
- code .

## Import StackBlitz Project into Angluar CLI

[Deploying Angluar: Running your application locally](https://angular.io/start/start-deployment)

Download the source code from your StackBlitz project by clicking the Download Project icon in the left menu, across from Project, to download your files.

Create a new Angular CLI workspace using the ```ng new``` command, where my-project-name is what you would like to call your project 

This command displays a series of configuration prompts. For this tutorial, accept the default settings for each prompt.

In your newly CLI-generated application, replace the /src folder with the /src folder from your StackBlitz download.

Use the following CLI command to run your application locally:  '''ng serve'''

Extra Steps needed:
- copy style.css from original src/ folder into your src/ folder
- ng serve
- gets errors about search provider, does not finish compile
- ctrl-c
- delete search provider files
- ng serve
- gets different errors, does not finish compile
- ctrl-c
- restore search provider files
- ng serve
- compiles successfully - localhost:4200 works!

(http://localhost:4200)

## Production

Generate web site production files from the angular project
- cd my-vent
- ng build --prod 
- creates dist/my-vent/*
- ng build was initially failing, fix was to copy src.orig/environment to src/

## Server (server.js)

Need web server to serve dist/my-vent files. We used Node.js express server example from link below

(https://itnext.io/express-server-for-an-angular-application-part-1-getting-started-2cd27de691bd)

- NOTE: to fix error, removed "server" from app.server.get() in server.js file from above example 
- to run server from my-vent directory: sudo node server.js 
- to fix initial problems running above command we ran:
- npm install express
- npm install compression
- port number is defined in server.js





