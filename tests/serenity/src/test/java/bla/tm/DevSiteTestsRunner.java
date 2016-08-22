package bla.tm;

import net.serenitybdd.jbehave.SerenityStories;

public class DevSiteTestsRunner extends SerenityStories {

    public static String baseTestedUrl = new SerenityStories().getEnvironmentVariables().getProperty("webdriver.base.url");

//    public static void main() throws IOException {
//
////      This section is added to run selenium test on headless Debian server started with Xvfb
////        START Xvfb through terminal
////            Xvfb :1 -ac -screen 0 1027x768x8 & export DISPLAY=:1 && java -Xmx2666m -jar /path/to/selenium-server-standalone-2.45.0.jar - port 4444 -Dwebdriver.chrome.driver=/path/to/chromedriver
////        START java code
//            WebDriver driver = new RemoteWebDriver(
//                    new URL("http://localhost:4444/wd/hub"), DesiredCapabilities.chrome());
//            driver.manage().timeouts().implicitlyWait(1, TimeUnit.MINUTES);
//            driver.get("https://code.google.com/p/chromedriver/issues/detail?id=1227");
//            String uAgent = (String) ((JavascriptExecutor) driver).executeScript("return navigator.userAgent;");
//            System.out.println(uAgent);
//
//            File srcFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
//            FileUtils.copyFile(srcFile, new File("/path/to/Pictures/xvfb1.png"));
////            driver.quit();
////         END
//    }
}
