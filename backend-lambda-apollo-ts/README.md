# Backend Apollo TypeScript

This is an example of a web application backend that can be deployed as an AWS Lambda function by waffle templates.

A few highlights:

- The code uses environmental variables that are provded by the Waffle CICD pipeline. The values provided by the CICD can be used for local development too.
- A buildspec.yml file was added to work with AWS CodeBuild (provided by the Waffle setup).
- Includes an npm script that generates typesafe GraphQL resolvers for the schema.
- Includes an npm script that generates typesafe fetch to a containerized service, using the open api specification of the service.

## Quick Start

Dependencies:

- It's expected that you have a Waffle environment set up in your AWS account.
- It's recommended to set up the alert-delivery-ts service, to have your alerts delivered to Slack
- It's recommended to set up the backend-ecs-fastapi-py service, to see how service-level connections work in the Waffle domain.

## Local development

- The devcontainer provided in this repo is configured for VSCode will the required development tools included
- Go to CodeBuild on your AWS console, and check the environmental variables to set your .env file.
- The repo uses yarn. Start local server with `yarn start:dev`
- To generate typesafe GraphQL resolvers, use the `yarn generate:graphql` npm script.
- To generate typesafe fetch to a containerized backend (backend-ecs-fastapi-py), use the `yarn generate:fetch` npm script.
