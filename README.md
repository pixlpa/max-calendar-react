# max-calendar-react

Implements a NodeJS-based event calendar and status page for use in Max 8 (node.script). The interface uses React/Bootstrap for the front end, and an express API backend, allowing for a dynamic listing of scheduled events. This recipe could also serve as a basic template for creating React front ends for Max-based NodeJS projects.

This project was originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Production Use

To run as a production build, you must first build a deployment version of the React site by sending the "npm run build" message to the node.script. Then send "script start" to start the server, and then navigate your browser to localhost:5000

## Development

For most usage, it will be sufficient to run a dev build of the React site. To do that, send the "script start" message followed by "script npm start" message. Since the site is actually running in React dev server, you must navigate your browser to "localhost:3000". This will work through a proxy with the Max server. This is useful when testing new site features.

## Available Scripts

In the project directory, you can run:

### `npm start:client`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


