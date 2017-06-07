require "rubygems"
require 'rake'
require 'yaml'
require 'time'

namespace 'travis' do
  SOURCE_BRANCH = 'dev'
  DEPLOY_BRANCH = 'master'
  REPORT_BRANCH = 'report'


  VERSION_URL = 'https://pages.github.com/versions.json'

  
  desc 'Test the site'
  task :test do
    result = 0
    if ENV['TRAVIS_BRANCH'] == 'master'
      puts "UI Automation tests Serenity-JBehave"
      resultS = system("mvn verify -f ./tests/serenity/pom.xml -Dmetafilter=\"-prod -NotImplemented\"")
      puts resultS
      if (resultS) == false
        puts 'test failed'
        exit 1
      end
      next
    else
      puts "Unit Tests Jest"
      puts 'npm install'
      system 'npm install'
      puts 'npm run test'
      resultU = system 'npm run test'
      if (resultU) == false
        puts 'Unit tests failed'
        exit 1
      end
      next
    end
    puts 'test final result'
    puts result
    exit result
    

  end
    

  desc 'Publish site to GitHub Pages from Travis'
  task :deploy do

    if ENV['TRAVIS_TEST_RESULT'].to_i != 0
      puts "Skipping deployment due to test failure"
      next
    end
    
    if ENV['TRAVIS_PULL_REQUEST'] != "false" or ENV['TRAVIS_BRANCH'] != SOURCE_BRANCH
      puts "Skipping deployment from #{ENV['TRAVIS_BRANCH']}"
      if ENV['TRAVIS_PULL_REQUEST'] != "false"
          puts "This branch is pull request."
      end
      next
    end
      
    
    repo = %x(git config remote.origin.url).gsub(/^git:/, 'https:')
    system "git remote set-url --push origin #{repo}"
    system 'git config credential.helper "store --file=.git/credentials"'
    File.open('.git/credentials', 'w') do |f|
      f.write("https://#{ENV['GH_TOKEN']}:x-oauth-basic@github.com")
    end

    # Notice: if you want add new directories to build, please do it here:
    status_api_expoloer_v2_scriptjs = `git show -m --name-only --pretty=format:%N HEAD | grep 'scripts/api-explorer/v2/script.js'`
    status_api_json_updated = `git show -m --name-only --pretty=format:%N HEAD | grep '_data/orgs'`
    status_api_expoloer_v2_updated = `git show -m --name-only --pretty=format:%N HEAD | grep 'scripts/api-explorer/v2/'`

    if (status_api_json_updated != '' || status_api_expoloer_v2_updated !='') && status_api_expoloer_v2_scriptjs == ''
      puts "Last commit has changes in swagger .json files or in API Exploerer V2"
      system 'npm install'
      system 'npm run build'
      status = `git status --porcelain`
      if status != ''
        puts "Files changed: \n#{status}"
        system "git config --global user.email 'de.gratnik@gmail.com'"
        system "git config --global user.name 'degratnik' "
        system "git config --global push.default current"
        # current repo has detached HEAD, so let do checkout:
        puts "git checkout #{SOURCE_BRANCH}"
        system "git checkout #{SOURCE_BRANCH}"
        puts "git status"
        system 'git status'
        puts "git add --all"
        system 'git add --all -v'
        puts "git status"
        system 'git status'
        puts "git commit"
        system 'git commit -v -m "TRAVIS BUILD COMMIT"'
        puts "git status"
        system 'git status'
        puts "git log"
        system 'git log -n 3'
        puts "git push"
        build_commit = system "git push -u -v origin #{SOURCE_BRANCH}"
        puts "git status"
        system 'git status'
        puts "Build commit: #{build_commit}"
        File.delete '.git/credentials'
        exit 0
      end
    end

    puts "Deploying from #{SOURCE_BRANCH} to #{DEPLOY_BRANCH}"
    deployed = system "git push origin #{SOURCE_BRANCH}:#{DEPLOY_BRANCH}"
    puts "Deployed: #{deployed}"

    File.delete '.git/credentials'

    if not deployed
      exit 1
    end
  end


  desc 'save report to GitHub from Travis'
  task :report do

    repo = %x(git config remote.origin.url).gsub(/^git:/, 'https:')
    system "git remote set-url --push origin #{repo}"
    system 'git config credential.helper "store --file=.git/credentials"'
    File.open('.git/credentials', 'w') do |f|
      f.write("https://#{ENV['GH_TOKEN']}:x-oauth-basic@github.com")
    end

    if ENV['TRAVIS_BRANCH'] == 'master'
      REPORT_BRANCH = 'report_master'
    end

    puts "Report from #{SOURCE_BRANCH} to #{REPORT_BRANCH} add files to 'tests/galen/reports/all'"
        system "git config --global user.email 'de.gratnik@gmail.com'"
        system "git config --global user.name 'degratnik' "
        system "git config --global push.default current"
        system "git add tests/serenity/target/site"
        system "git commit --allow-empty  --amend -m 'Auto-Report from Travis #{Time.now.utc.to_s}'"
        system "git checkout -b #{REPORT_BRANCH}"
    reported = system "git push -u -f origin #{REPORT_BRANCH}"

    puts "Reported: #{reported}"
    puts "Reported-time(at UTC=+0000): #{Time.now.utc.to_s}"

    File.delete '.git/credentials'

    if not reported
      exit 1
    end
  end

end



