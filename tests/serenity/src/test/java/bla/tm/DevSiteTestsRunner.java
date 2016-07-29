package bla.tm;

import net.serenitybdd.jbehave.SerenityStories;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.concurrent.TimeUnit;

public class DevSiteTestsRunner extends SerenityStories {

    public static void main() throws IOException {
        WebDriver driver = new RemoteWebDriver(
                new URL("http://localhost:4444/wd/hub"), DesiredCapabilities.chrome());
        driver.manage().timeouts().implicitlyWait(1, TimeUnit.MINUTES);
        driver.get("https://code.google.com/p/chromedriver/issues/detail?id=1227");
        String uAgent = (String) ((JavascriptExecutor) driver).executeScript("return navigator.userAgent;");
        System.out.println(uAgent);

        File srcFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(srcFile, new File("/path/to/Pictures/xvfb1.png"));
        driver.quit();
    }
}
