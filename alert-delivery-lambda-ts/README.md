# Alert delivery to Slack

This is an example of a lambda function that can be deployed by Waffle templates, to deliver Waffle alerts to your Slack.

## Quick Start

Dependencies:

- It's expected that you have a Waffle environment set up in your AWS account.
- You need to have a slack application created, and have its webhook url

## Installation

Once you have installed this stack, edit the secret that was generated for this stack.
The value of alertSlackWebhook has to be your slack webhook in order to deliver the messages to slack.

## Local development

- The devcontainer provided in this repo is configured for VSCode will the required development tools included
- Once the repo is deployed, go to CodeBuild on your AWS console, and check the environmental variables to set your .env file.
- Go to the Secrets Manager of your AWS console, and set a slack webhook URL in the related secret, that was deployed. You'll probably need to create an app on Slack first, and get its webhook URL first.
