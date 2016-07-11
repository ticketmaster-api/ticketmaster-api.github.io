package bla.tm.pages;

import bla.tm.staticmethods.DriverProperties;
import net.serenitybdd.core.annotations.findby.FindBy;
import org.openqa.selenium.WebElement;
import static org.junit.Assert.assertTrue;

import java.util.HashMap;
import java.util.Map;

import static java.util.Optional.ofNullable;

public class AnyPage extends AncestorPage {

    @FindBy(xpath = "//h1[@class='public ']/strong/a")
    private WebElement gitHubSDKJavaTitle;

    @FindBy(xpath = "//h1[@class='public ']/strong/a")
    private WebElement gitHubJavaScriptTitle;

    @FindBy(xpath = "//h1[@class='public ']/strong/a")
    private WebElement gitHubJavaScalaTitle;

    @FindBy(xpath = "//div[@class='text-wrapper col-lg-6 col-sm-12 col-xs-12']/h1[@class='only-desktop']")
    private WebElement pantheonLogInTitle;

    @FindBy(xpath = "//h1[@class='site-title']/a")
    private WebElement techTitle;

    @FindBy(xpath = "//h2[text()='Because Engineers are Fans Too!']")
    private WebElement mediumTitle;

    @FindBy(xpath = "//td[@class='WikiLogoName']/a")
    private WebElement apiDocumentationTitle;

    public String baseTestedUrl = new DriverProperties().getEnvironmentVariables().getProperty("webdriver.base.url");

    private Map<String, WebElement> getClickableElements() {
        Map<String, WebElement> elements = new HashMap<String, WebElement>();
        elements.put("WIDGETS", this.titleText);
        elements.put("WIDGETS COUNTDOWN", this.titleText);
        elements.put("sdk-java", gitHubSDKJavaTitle);
        elements.put("sdk-javascript", gitHubJavaScriptTitle);
        elements.put("sdk-scala", gitHubJavaScalaTitle);
        elements.put("LOG IN", pantheonLogInTitle);
        elements.put("THE API EXPLORER", this.titleText);
        elements.put("Ticketmaster / Open Source", this.titleText);
        elements.put("Ticketmaster Technology", techTitle);
        elements.put("Because Engineers are Fans Too!", mediumTitle);
        elements.put("Ticketmaster API Documentation", apiDocumentationTitle);
        elements.put("GETTING STARTED", this.titleText);
        elements.put("PARTNER API", this.titleText);
        elements.put("DEALS API", this.titleText);
        elements.put("Direct Payments", this.titleText);
        elements.put("ADDING EVENT DISCOVERY WIDGET", this.titleText);
        return elements;
    }

    public void checkIsElementIsShown(String key) {
        WebElement element;
        ofNullable(element = getClickableElements().get(key)).orElseThrow(
                () -> new RuntimeException("There is no such element on the page"));
        assertTrue(element.isDisplayed());
    }
}
