#!/bin/bash
echo 'Before script'
#set -ev #for debugging
sleep 10 # give xvfb some time to start

copyTestContent() {
  rm ./_site/* -rf #remove directory _site
  rm ./events/* -rf #remove directory events
  rm ./partners/* -rf #remove directory partners
  \cp -avrf ./tests/content/* ./ #copy test content
}

if [ "${TEST_SEVERITY}" = "OFF" ]; then
  exit 0
elif [ "${TEST_SEVERITY}" = "LOW" ]; then
  jekyll build
elif [ "${TEST_SEVERITY}" = "MEDIUM" ]; then
  copyTestContent
  jekyll build
elif [ "${TEST_SEVERITY}" = "HIGH" ]; then
  copyTestContent
  jekyll build
elif [ "${TEST_SEVERITY}" = "CRITICAL" ]; then
  copyTestContent
  jekyll build
fi


