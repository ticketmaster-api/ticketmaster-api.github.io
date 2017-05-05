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
      puts "Test serenity"
      resultS = system("mvn verify -f ./tests/serenity/pom.xml -Dmetafilter=\"-prod -NotImplemented\"")
      puts resultS
      puts "Test galen"
      resultG = system("sh ./tests/run-test-dispatch.sh")
      puts resultG
      puts 'test result'
      if (resultS) == false
        puts 'test failed'
        exit 1
      end
      next
    else
      puts "Test low"
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
          puts "This brach is pull request."
      end
      next
    end
      
    
    repo = %x(git config remote.origin.url).gsub(/^git:/, 'https:')
    system "git remote set-url --push origin #{repo}"
    system 'git config credential.helper "store --file=.git/credentials"'
    File.open('.git/credentials', 'w') do |f|
      f.write("https://#{ENV['GH_TOKEN']}:x-oauth-basic@github.com")
    end

    status_api_expoloer_v2_scriptjs = `git show --name-only --pretty=format:%N HEAD | grep 'scripts/api-explorer/v2/script.js'`
    status_api_json_updated = `git show --name-only --pretty=format:%N HEAD | grep '_data/orgs'`
    status_api_expoloer_v2_updated = `git show --name-only --pretty=format:%N HEAD | grep 'scripts/api-explorer/v2/'`

    if (status_api_json_updated != '' || status_api_expoloer_v2_updated !='') && status_api_expoloer_v2_scriptjs == ''
      puts "Last commit has changes in swagger .json files or in API Exploerer V2"
      system 'npm install'
      system 'npm run build'
      status = `git status --porcelain`
      if status != ''
        system 'git add .'
        system 'git commit -m "TRAVIS BUILD COMMIT"'
        build_commit = system "git push origin #{SOURCE_BRANCH}"
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
        system "git add tests/galen"
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



