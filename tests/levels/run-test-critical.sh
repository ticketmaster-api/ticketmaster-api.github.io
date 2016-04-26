#!/bin/bash
echo "starts criticalLevelTest."
set -e #exit on error

  # part1
galen test tests/galen/all.test --htmlreport tests/galen/reports/all --groups HomePage
galen test tests/galen/all.test --htmlreport tests/galen/reports/all --groups PD-getting-started-Page
galen test tests/galen/all.test --htmlreport tests/galen/reports/all --groups PD-WidgetsPage
  # part2
galen test tests/galen/all-part2.test --htmlreport tests/galen/reports/all-part2 --groups ProductsDocsSlate
galen test tests/galen/all-part2.test --htmlreport tests/galen/reports/all-part2 --groups ProductsDocsConsole
galen test tests/galen/all-part2.test --htmlreport tests/galen/reports/all-part2 --groups BlogsPage
galen test tests/galen/all-part2.test --htmlreport tests/galen/reports/all-part2 --groups SupportPage
galen test tests/galen/all-part2.test --htmlreport tests/galen/reports/all-part2 --groups Events
galen test tests/galen/all-part2.test --htmlreport tests/galen/reports/all-part2 --groups PartnersLanding #in progress
  #part3
galen test tests/galen/all-part3.test --htmlreport tests/galen/reports/all-part3 --groups SupportContactUs
galen test tests/galen/all-part3.test --htmlreport tests/galen/reports/all-part3 --groups SupportBrandingGuide
galen test tests/galen/all-part3.test --htmlreport tests/galen/reports/all-part3 --groups Search
galen test tests/galen/all-part3.test --htmlreport tests/galen/reports/all-part3 --groups PartnersDistribution
galen test tests/galen/all-part3.test --htmlreport tests/galen/reports/all-part3 --groups PartnersCertified
galen test tests/galen/all-part3.test --htmlreport tests/galen/reports/all-part3 --groups APIExplorer
