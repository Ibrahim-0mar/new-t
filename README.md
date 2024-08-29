# new-travolic
New approach for Travolic's website
# How to run the project locally

1. Setting up the project
   1. Clone the repository
   2. Install yarn in your device (if you don't have it already) [https://yarnpkg.com/getting-started/install] (Yan Installation)
   3. Run `yarn install` in the root folder of the project to install all the dependencies
2. Setting up infisical (The secrets .env)
   1. Install the CLI [https://infisical.com/docs/cli/overview] (Infisical CLI Installation)
   2. NOTE: DON'T FORGET TO UPDATE THE CLI TO THE LATEST VERSION
   3. Loggin into your account in the CLI using `infisical login` (Ask your team lead for the credentials)
   4. Run `infisical init` in the root folder of the project and select "Internal API" as the type of project
   5. After runing the init command, it will create a .infisical.json file, you need to update the `defaultEnvironment` property with `local`

3. Running the project
  run `yarn dev`


# note the src/app/api folder is for Route Handlers => only use it if you want to make an api end-point
