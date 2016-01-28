require "rubygems"
require 'rake'
require 'yaml'
require 'time'

namespace 'travis' do
  SOURCE_BRANCH = 'dev'
  DEPLOY_BRANCH = 'master'
  REPORT_BRANCH = 'report'

  VERSION_URL = 'https://pages.github.com/versions.json'

  

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

    puts "Report from #{SOURCE_BRANCH} to #{REPORT_BRANCH} add files to 'tests/galen/reports/all'"
        system "git config --global user.email 'de.gratnik@gmail.com'"
        system "git config --global user.name 'degratnik' "
        system "git config --global push.default current"
        system "git add tests/galen"
        system "git commit -a -m 'Auto-Report from Travis'"
        system "git checkout -b #{REPORT_BRANCH}"
    reported = system "git push -u -f origin #{REPORT_BRANCH}"

    puts "Deployed: #{reported}"

    File.delete '.git/credentials'

    if not reported
      exit 1
    end
  end

end



