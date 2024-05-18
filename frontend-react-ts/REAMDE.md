# Frontend React TypeScript

This is an example of a web application frontend that can be deployed by Waffle templates.

The example was created using create-react-app, and was modified:
- The code uses environmental variables that are provded by the Waffle CICD pipeline.
- A buildspec.yml file was added to work with AWS CodeBuild (provided by the Waffle setup).
- A simple authentication UI was added that uses the AWS Amplify SDK to connect to AWS Cognito (provided by the Waffle setup).
- A customized fetch function is added (`src/awsGraphqlFetch.ts`) that signs request for AWS API Gateway IAM Authentication. This is a possible way of working with the Waffle templates.
- A modified apollo client that uses the customized fetch function, so that GrahpQL queries can be made to an AWS API Gateway that requires IAM authentication.

## Installation

### Requirements

The following stacks have to be deployed to your AWS account in order for this stack to deploy:
- Hostname configuration and certificate setup
- VPC
- API Gateway
- Authentication
- Misc (this enables GitHub repos to trigger the CICD pipeline)

For setting these up, please refer to the Waffle templates repository README.

###  Deploying this stack

The `cdn-template.json` deploys a CICD pipeline that can deploy static files into an AWS S3 bucket. It also sets up an AWS CloudFront distribution for serving websites that uses the S3 bucket as its file storage.

Go to AWS Console > CloudFormation and select Create stack. Select that the template is ready, and choose Upload a template file. Select cdn-template.yml from this repo.

When deploying the cloudformation template, use the following parameters. Feel free to ignore the parameters that are marked as (optional).

- Stack name: Unique name of the deployed stack. Can be whatever of your choice, for example: `waffle-example-frontend-react-ts`
- BuildspecPath: `frontend-react-ts/buildspec.yml`
- CICDManualApproval: `False` or `True`: shall CodePipeline stop and wait for manual approval after building the code before actually updating the latest deployment.
- DeploymentId: the id that you used for the required stacks explaing in the Requirements section
DeploymentType: `DEV` or `PROD` : the deployment type that you used for the required stacks explaing in the Requirements section
- FullDomainName: the domain created in the new AWS account (dev.example.com)
- GenericCertificateArn: the ARN of the certificate created above
- GithubBranch: main
- GithubOwner: WaffleCodeApp
- GithubRepoName: waffle-examples
- PipelineId: frontendreactts
- WebHostname: www by default (for www.dev.example.com), but can be whatever

It's OK to use the default stack option configuration. Before submission, acknowledge that the templates are going to create IAM roles.

The time required to deploy the cicd and related infrastrucre, is expected to take 5-ish minutes.
