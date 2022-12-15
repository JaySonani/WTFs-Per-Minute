# WTF/Minute Cloud functions

Contains Google Cloud Function code that will be used as a collector endpoint for WTF/minute endpoints.

## Getting started

Ensure you have node and npm installed locally. Having docker will also be necessary. See confluence on how to install docker on your machine. To install node and npm, simply use:

```
brew update
brew install node
```

Then you have to install the Google Typescript Service by doing:

```
npx gts init
```

> Note: This can only be done if you have access to google cloud functions framework. If starting from scratch, you will need to install the framework first and then call that. 

## Bootstrapping the project locally

Since this is a node project you just need to do:

```
npm install
```

# Working

## Getting the stack up

To work with the project, you need to run the typescript compiler watch:

```
npm run watch
```

And leave it running in the background. It will recompile all Typescript changes in a live way and reload the dev server.

Then you also need a docker stack, you can use the docker-compose.yml file to load the necessary components. They are all emulators that you need to work with the function.

```
docker-compose up -d
```

## Running tests and linting

As you run tests, the linter will tell you if there are issues to fix. The easiest way to do this is to run:

```
npm run fix
```

To run the tests, simply run:

```
npm run test
```

# Technical details

## The functions

The repo exposes 1 cloud function with the following objective:

- `WtfPerMinuteCollector`: Used to receive the WTF/minute event and store them in Firestore.

## General structure of components

All the code is in `src` and is shared between functions as needed. The `index.ts` file exposes the  cloud function entry points.

Each entrypoint uses a handler from `Handlers`. This is made to abstract as much as possible the concept of Express Requests and Responses but still needs a lot of work. We should use DTOs instead to pass data from entrypoint to the handlers.

# Deploying the functions

Compile the functions to the build directory with `npm run test` or `npm run compile`.

Then you must copy the `package.json` and `package-lock.json` to the `./build/src/`.

Ensure the package.json that you copy has only `start` script with updated path. 

```
  "scripts": {
    "start": "functions-framework --source=index.js --target=WtfPerMinuteCollector"
  },
```

Also ensure that package.json removes the `watch` node.

Once this is done, change into the `./build/src/` directory and issue the following commands:

**Deploy the different handler**

```
npm run compile
find build/src -name "*.ts" -delete
find build/src -name "*.map" -delete

cd build/src
gcloud functions deploy wtf-per-minute-collector \
    --region=northamerica-northeast1 \
    --allow-unauthenticated \
    --entry-point WtfPerMinuteCollector \
    --runtime=nodejs16 \
    --memory=128MB \
    --service-account=wtf-per-minute-cloud-functions@hackday-dec-2022.iam.gserviceaccount.com \
    --source=. \
    --trigger-http
```