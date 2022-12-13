# Web Application Boilerplate
 This project contains Hotovo boilerplates for web application projects.

All branches contain  Typescript, ESlint, Stylelint for quality control. Code quality is checked automatically on git push through git hooks. Webpack and Babel are used for bundling and transpiling.

## Setup instructions

### Requirements
- Node 6.* or higher
- NPM
- sh-compatible shell (Bash, Git Bash on Windows)
- coding environment supporting ESLint, Stylelint, Flow

### Installation
 1. To setup up new project using a boilerplate use [Web Application Generator](https://bitbucket.org/hotovo/webapplication-generator/)
 2. Run npm install in project directory
 3. Create `.env.dev` file based on `.env.dev.dist`
 4. Run `npm start` to start development server with Hot Module Replacement support
 5. Head to `http://localhost:3000`

### Usage

#### Configuration
All configurations files are placed in the root.
For application specific configuration please duplicate .env.dev.dist and .env.production.template files and rename them to .env.dev and .env.production.

#### Translations
If your project requires translations we recommend using i18next / react-i18next libraries.

#### Calling API
For calling an API please use common/api class.

#### Running mock API server
 Each boilerplate contains [JSON Server](https://github.com/typicode/json-server) which allows to mock API. Have a look at `test/mock-server/server.js` for implementation.
 Use `npm run test:mock-server` to start mock server



#### Running check
Run `npm run check` before each commit to check your code formatting as well as run unit tests.

#### Running end-to-end tests
Run `npm run test:e2e` to run [Playwright](https://playwright.dev/) end-to-end tests.

#### Production build
Depends on your build environment, but in most cases follow:
 1. Copy `.env.production.template` to `.env.production`
 2. Run `npm run build`
 3. Content is placed in `/dist` directory
