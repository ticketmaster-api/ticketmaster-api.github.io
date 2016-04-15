#!/bin/bash
echo "starts MEDIUM level test."
set -e #exit on error

# ./node_modules/karma/bin/karma start karma.conf.js
# htmlproof ./_site --verbose --href-ignore "#" --disable-external --file-ignore './_site/node_modules/*'

galen test tests/galen/all.test --htmlreport tests/galen/reports/all --groups HomePage
