# Example stacks for Waffle

This repo contains stacks that can be deployed to a Waffle environment using Waffle-templates.

- **frontend-react-ts**: A simple hello-world frontend that requires MFA authentication, and uses signed requests with frequent token rotation to connect to a backend service.
- **backend-lambda-apollo-ts**: A simple graphql backend service deployed as AWS Lambda as part of a complete CloudFormation stack. It uses the AWS parameter store to figure out the internal URL of another service to connect to. Also connect to AWS Cognito for detailed user information.
- **backend-ecs-fastapi-py**: A simple HTTP REST backend service deployed as container into AWS ECS Fargate. Demonstrates how to implement a health-check endpoint, which is required by the load balancer.
- **alert-delivery-lambda-ts**: A backend service deployed as AWS Lambda that listens to the AWS SNS Topic where Waffle alarms and notifications are sent, and delivers it to a Slack application of your choice. Uses AWS Secret Manager for storing the sensitive information for the Slack application.

Each stack is meant to demonstrate build configurations and working with AWS and other services. But they also work together if you deploy all of them to the same Waffle environment.

Details in the READMEs of each stacks.
