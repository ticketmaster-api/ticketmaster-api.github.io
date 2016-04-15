#!/bin/bash
set -e #exit on error

echo "Test dispatcher starts now."
echo 'param set is: ' ${TEST_SEVERITY}

if [ "${TEST_SEVERITY}" = "CRITICAL" ]; then
  sh ./tests/levels/run-test-critical.sh
fi

if [ "${TEST_SEVERITY}" = "HIGH" ]; then
  sh ./tests/levels/run-test-high.sh
fi

if [ "${TEST_SEVERITY}" = "MEDIUM" ]
then
  sh ./tests/levels/run-test-medium.sh
fi

if [ "${TEST_SEVERITY}" = "LOW" ]; then
  exit 0
fi

if [ "${TEST_SEVERITY}" = "OFF" ]; then
  echo 'test is OFF'
  exit 0
fi

echo 'test result2 ' ${TRAVIS_TEST_RESULT}