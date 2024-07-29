# Backend Apollo TypeScript

This is an example of a containerized backend service that can be deployed AWS ECS Fargate instances using waffle templates.

## Quick Start

Dependencies:

- It's expected that you have a Waffle environment set up in your AWS account.

## Local development

- The devcontainer provided in this repo is configured for VSCode will the required development tools included
- Go to CodeBuild on your AWS console, and check the environmental variables to set your .env file.
- You can start a local server using the `http_server.py` script.
- To generate an openapi 3.1 specification for your server, use the `generate_openapi_json.py` script. You can use the generated openapi in your other components, like as demonstrated in the backend-lambda-apollo-ts repo.
