# Angular TO-DO App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Topic Cover

This application is able to demonstrate the below features:
1. Login in the application with following pattern:
    1. The password should contain small letters and numbers only. e.g. `abc123` is a valid password.
    2. Saves the login status for next time if user logs-in successfully and the session is available till next logout click.
    
2. Fetch the saved to-do, if any, from local storage.
3. Add new to-do by clicking on `+` button in right bottom corner
4. Complete OR delete the to-dos
5. Demonstrate the use of modular application using:
    * Header Module => contains login logic and login popup
    * To-do view ==> Used to modularize the to-do view


## Code Structure
This application contains two modules:

1. Header Module
2. To-do view Module

Header module contains below components:
1. Header component: Used to show the header which contains 
    * Login popup (automatically shows the login popup if user is using it first time)
    * Logout button (if User already logged-in)

2. To-do view module contains below component

    * To-doView component: shows the to-do list and used can create new to-do as well.
    * To-doPopup: used to add new To-do in list
    *   To-do card Layout : Used to show the to-do in card layout

3. Services:
    * manage-to-do.service: Used to save/delete/toggle the status of to-do

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Add one test case for `manage-to-do.server.ts`

## URL
[TODO In Angular](https://ritsrivastava01.github.io/Angular-todo/ )

