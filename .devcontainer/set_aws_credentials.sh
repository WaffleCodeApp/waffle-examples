#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
GREY='\033[0;37m'
NC='\033[0m' # No Color
ECHO_START="${GREY}[aws_set_profile] "

if [ -z $1 ]
then
  echo
  echo
  echo Usage from the parent directory:
  echo
  echo "\$. .devcontainer/aws_set_profile.sh <DEPLOYMENT_ID>"
  echo
  echo Where DEPLOYMENT_ID is the name of the local AWS profile configuration.
  echo The DEPLOYMENT_ID is used to identify installed deployments in AWS.
  echo Typcally values for DEPLOYMENT_ID are "dev" or "prod".
  echo
  echo Locally existing AWS profiles:
  grep "\[profile " ./.aws/config
  echo
  exit 1
fi

echo "${ECHO_START}Checking for local AWS profile..."
if grep "\[profile $1\]"  ./.aws/config >> /dev/null
then
  echo
  echo "${ECHO_START}AWS profile $1 already exists, you're all set.${NC}"
else
  echo
  echo "${ECHO_START}AWS profile $1 doesn't exist. Setting it up now.${NC}"
  echo "${ECHO_START}${YELLOW}The aws configurator will be run now. When asked set the following answers: ${NC}"
  echo "${ECHO_START}${YELLOW}Region: us-east-1${NC}"
  echo "${ECHO_START}${YELLOW}Format: json${NC}"

  echo
  aws configure --profile $1
fi

echo
echo -e "${ECHO_START}${GREEN}Done.${NC}"
