#!/bin/bash
echo "HIGH test starts"
set -e #exit on error

galen test tests/galen/all.test --htmlreport tests/galen/reports/all --groups HomePage
galen test tests/galen/all-part2.test --htmlreport tests/galen/reports/all-part2 --groups PartnersLanding #in progress
galen test tests/galen/all-part2.test --htmlreport tests/galen/reports/all-part2 --groups SupportPage
galen test tests/galen/all-part2.test --htmlreport tests/galen/reports/all-part2 --groups BlogsPage
galen test tests/galen/all-part2.test --htmlreport tests/galen/reports/all-part2 --groups Events
