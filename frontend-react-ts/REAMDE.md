# Frontend React TypeScript

This is an example of a web application frontend that can be deployed by Waffle templates.

The example was created using create-react-app, and was modified:

- The code uses environmental variables that are provded by the Waffle CICD pipeline. The values provided by the CICD can be used for local development too.
- A buildspec.yml file was added to work with AWS CodeBuild (provided by the Waffle setup).
- A simple authentication UI was added that uses the AWS Amplify SDK to connect to AWS Cognito (provided by the Waffle setup).
- A customized fetch function is added (`src/awsGraphqlFetch.ts`) that signs request for AWS API Gateway IAM Authentication. This is a possible way of working with the Waffle templates.
- A modified apollo client that uses the customized fetch function, so that GrahpQL queries can be made to an AWS API Gateway that requires IAM authentication.
- Includes an npm script that generates typesafe GraphQL query components for the backend connection.

## Quick Start

Dependencies:

- It's expected that you have a Waffle environment set up in your AWS account.
- It's recommended to set up the backend-lambda-apollo-ts service as well, to get
  responses for your queries.

## Local development

- The devcontainer provided in this repo is configured for VSCode will the required development tools included
- Once the repo is deployed, go to CodeBuild on your AWS console, and check the environmental variables to set your .env file.
- The repo uses yarn. Start local server with `yarn start`
- To generate typesafe Apollo GraphQL query components, use the `yarn generate:graphql` npm script.
