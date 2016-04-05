#!/bin/bash
echo "starts MEDIUM level test."

# ./node_modules/karma/bin/karma start karma.conf.js
# htmlproof ./_site --verbose --href-ignore "#" --disable-external --file-ignore './_site/node_modules/*'

galen test tests/galen/all.test --htmlreport tests/galen/reports/all --groups HomePage


if [ "${TEST_SEVERITY}" = "OFF" ]; then
  echo 'test is OFF'
  exit 0
fi