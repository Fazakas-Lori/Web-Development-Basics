# Web-Development-Basics

## DEPLOY TO AZURE / TASKS

0. PREREQUISITES: AZURE SUBSCRIPTION / ACCOUNT WITH MONEYS
1. In [Azure Portal website](https://portal.azure.com/) create a separate _Resource Group_ resource to:
   - Easily track the resources the application will be using - And incide
   - Easily track the cost of resources
   - Easily configure group wide settings, like _Policies, Access Control, Events, Settings, ..._,
   - Note: [*Resource Group*s](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal#what-is-a-resource-group) are containers the hold related resources together
2. Create an _App Service Plan_ resource that will define a set of compute resources for our app
   - In the form, select the previously created resource group
   - Give a unique _Name_ for the plan
   - Select Linux as the _Operating System_
     - Note: Linux is cheaper to run
   - Select a European _Region_ that you are close to
   - Select a **BASIC B1** _Pricing Plan_
   - Note: [*App Service Plan*s](https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans) define sets of computational resources for server apps to run on
3. Create a [_Web App_](https://learn.microsoft.com/en-us/azure/app-service/overview) resource that we can deploy to
   - In the form, select the previously created resource group
   - Give a unique _Name_ for the web app
   - Leave the _Code_ as the default _Publish_ type, but also notice that _Container_ is also an option
   - Select _Node 20 LTS_ as the _Runtime Stack_, but notice the other available technologies
   - Select the same _Region_ you previously selected when creating the _App Service Plan_
     - Notice: This way, you can select the previously created _App Service Plan_ as the _Linux Plan_
     - Notice: The Pricing Plan also appears here, showing the available computational resources the app can use
   - Skip over the other options (Database, Deployment, Networking, Monitor + secure, Tags) and jump to _Review+create_ and create the resource
4. Configure the created Web app for our Express Server
   - Open the created Web App
   - Under _Settings / Environment Variables_ set the following environment variables
     - `NODE_ENV`, `production`
     - `SCM_DO_BUILD_DURING_DEPLOYMENT`, `true`
       - Note: this will cause the container to run `npm install` after deploy
   - Stop the web app so we can safely deploy
5. Deploy the web app from a command line, using [_Azure Cli_](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
   - Open a terminal to the root directory of the project
   - Log in to your azure account: `az login`
   - Check that you are using the correct subscription: `az account list --output table`
     - If not, set it with `az account set --name "[subscription/tenant name]"`
   - Build the project with `npm run build-prod`
   - Modify `dist/package.json` as frontend file are already fully bundled
     - Note: server does not need _react_, _react-dom_, _devDependencies_ and _scripts_, so delete these
     - Modify `main` object to `"main": "server.js",`
   - Zip the _contents_ of the `dist` folder, and copy the result zip to the root folder
   - Deploy the zip with `az webapp deploy --resource-group [resource group name] --name [web-app-name] --src-path ./[zip name].zip`
6. Check Deployment and start the app
   - Open the created Web App Resource
   - Under _Deployment / Deployment Center_ check the deployment logs
   - Under _Log Stream_ check the container logs
     - Note: You may need to access the app url under _Overview_
   - Under _Development Tools_ check _SSH_ and _Advaned Tools_ for files
   - Under _Overview_ press the _Start_ button
