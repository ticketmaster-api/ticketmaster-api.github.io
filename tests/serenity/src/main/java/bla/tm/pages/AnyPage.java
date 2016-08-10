package bla.tm.pages;

import bla.tm.staticmethods.DriverProperties;
import net.serenitybdd.core.annotations.findby.By;

public class AnyPage extends AncestorPage {

    public String baseTestedUrl = new DriverProperties().getEnvironmentVariables().getProperty("webdriver.base.url");

    public void keyPageElementIsVisible(String xpath) {
        element(By.xpath(xpath)).shouldBeVisible();
    }
}
