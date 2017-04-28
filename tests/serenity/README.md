# Test Automation Framework 

### Running tests
#### JBehave plugin for IntelliJ IDEA
 1. Install JBehave for Java plugin for IntelliJ IDEA.
 2. Right-click on particular feature file and select 'Create run configuration from context'.
 3. Run created configuration.
 
 Known issue: JBehave for Java plugin does not handle WebDriver instance properly , so can not create run configuration, clicking on story file and execute it from context'.

#### JUnitRunner in IntelliJ IDEA
 1. Create a JUnit run configuration.
 2. Specify particular story or scenario with tag `@debug`.
 3. Select test type `Class` and specify `com.tkmdpa.taf.AcceptanceTestSuite` as class to run.
 4. Specify VM options, i.e. `-ea -Dmetafilter=+debug`
 5. Run created configuration. This approach is also applicable for debugging purposes.

#### Maven
 1. Open project root and `serenity.properties` file and specify appropriate url  in `webdriver.base.url` property to run tests on.
 2. Open terminal, navigate to project root folder and run `mvn clean install` to compile and install modules into local repository.
 3. Run `mvn clean integration-test -Dmetafilter="-prod -NotImplemented" -DtestRunName="Release {numberOfRelease}(staging)"` to execute all tests in current module.
 4. Open `serenity/target/site/serenity/index.html` with browser to see test execution report.

### SonarQube
 It is recommended to run SonarQube static analysis prior to pushing new code to main branch.
 
#### Set up SonarQube Runner
 1. Download and unzip distribution archive.
 2. Make sure to add `JAVA_HOME\bin` and SonarQube runner `bin` folder to `PATH`
 3. Edit `conf\sonar-scanner.properties` file and add Sonar server URL:
 ```
 #----- Default SonarQube server
 sonar.host.url=http://epuavinl6300:9000
 ```
 
#### Run analysis
 1. Run `mvn sonar:sonar` from a project root. Find the report on http://localhost:9000/.
 2. From project root directory run `sonar-scanner.bat` or `sonar-runner.bat`. Find the path to report in the end of execution log.
