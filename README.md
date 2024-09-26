# Ngrx Separate States By Lazy Loaded Modules Example

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

## Live Demo

You can explore a live demo of this project on StackBlitz. Click the link below to interact with the application and see its features in action:

<a href="https://stackblitz.com/~/github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example" target="_blank" rel="noopener noreferrer">Live Demo on StackBlitz</a>

## GitHub Repository

You can find the full source code for this project on GitHub:

[GitHub Repository](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example)

## Development Server

Run `ng serve` to start a development server. Navigate to `http://localhost:4200/`. The application will automatically reload if you make changes to any of the source files.

## Component Generation

Run `ng generate component component-name` to create a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to compile the project. The build artifacts will be stored in the `dist/` directory.

## Lazy Loading of Components and Services

This project implements lazy loading for modules, components, and services, optimizing application performance by loading only what is necessary when accessing each module.

Each module is associated with its own JS chunk, which includes both the module code and the necessary logic to interact with the data. This means that when you navigate to a specific section of the application, the corresponding JS chunks are downloaded, and the required data is retrieved using the services included in those chunks.

Thanks to **ngrx-store-localstorage**, `localStorage` is automatically synchronized with the Redux state, allowing the application state to be restored upon restarting.

## NgRx Effects

Effects are used to handle asynchronous interactions and data loading operations within the application. In this project, they facilitate the efficient loading of list data and manage actions for adding and removing products.

## Redux DevTools

The application is integrated with **Redux DevTools**, which allows you to visualize and debug state changes easily. You can install the corresponding browser extension and use it to monitor state changes.

## Screenshots

![1](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/1.png?raw=true)
1. **Initial Screen**: Displays the main view upon loading the application.
![2](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/2.png?raw=true)
2. **Login Screen**: Shows how the user logs in and the information is saved in Redux storage.
![3](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/3.png?raw=true)
3. **Loading the `Weather` Module**: Demonstrates how the corresponding JS file for the `Weather` module is downloaded when navigating to this section, and how the information is fetched and saved in Redux storage.
![4](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/4.png?raw=true)
4. **Loading the `List` Module**: Shows how the JS file for the `List` module is downloaded when accessing the shopping list and how the information is fetched and saved in Redux storage.
![5](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/5.png?raw=true)
5. **Adding Products to the List**: Demonstrates how products are added to the shopping list.

## Adding a New Module

To add a new module to this application, you need to make several changes to integrate it properly into the existing structure:

![6](https://github.com/caballeroluis/ngrx-separate-state-by-lazy-module-example/blob/master/src/assets/img/6.png?raw=true)

1. **Import the New Module**: You must import the new module into your `AppModule`. This is done by modifying the `imports` array to include the necessary imports for the new module and its associated components. This will also include the `localStorageSyncReducer` for state persistence. Ensure that you add the key `'new'` in the `localStorageSync` configuration to persist its state.

2. **Update the Navigation**: In the header component or wherever the navigation links are defined, add a new link for the new module. This allows users to easily navigate to the newly added feature.

3. **Configure Routing**: Update the routing configuration in `AppRoutingModule` to include a route for the new module. This will typically involve adding a new path to the `Routes` array that points to the lazy-loaded module. The structure should look like this:
   - Add a new route object with the path set to `'new'` and configure it to load the new module using the dynamic import syntax.

After making these changes, the application will recognize the new module and load it when the specified route is accessed.

## About Data Storage

This project uses **ngrx-store-localstorage** to persist the application state in the local storage of the user's device. This means that when interacting with the application, data such as the shopping list, preferences, and session information **may be stored on your device**.

Please note the following:
- Local storage is used to persist certain state data of the application.
- Data stored locally remains on your device and is not sent to external servers unless specified otherwise in the application logic.
- You can manually delete this data by clearing the local storage of your browser or using functions within the application to reset the state.

### How to Clear Local Storage:
1. Open your browser's development tools (`F12` or `Ctrl + Shift + I` / `Cmd + Option + I`).
2. Navigate to the **Application** tab (for Chrome) or **Storage** (for Firefox).
3. In the Local Storage section, locate and delete the data stored for `http://localhost:4200/` or the respective domain.

## Additional Help

For further assistance with Angular CLI, use `ng help` or refer to the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
