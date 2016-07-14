package bla.tm.pages;

import bla.tm.staticmethods.DriverProperties;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import static org.junit.Assert.assertTrue;

import java.util.HashMap;
import java.util.Map;

public class AnyPage extends AncestorPage {

    @FindBy(xpath = "//h1[@class='public ']/strong/a")
    private WebElementFacade gitHubSDKJavaTitle;

    @FindBy(xpath = "//h1[@class='public ']/strong/a")
    private WebElementFacade gitHubJavaScriptTitle;

    @FindBy(xpath = "//h1[@class='public ']/strong/a")
    private WebElementFacade gitHubJavaScalaTitle;

    @FindBy(xpath = "//div[@class='text-wrapper col-lg-6 col-sm-12 col-xs-12']/h1[@class='only-desktop']")
    private WebElementFacade pantheonLogInTitle;

    @FindBy(xpath = "//h1[@class='site-title']/a")
    private WebElementFacade techTitle;

    @FindBy(xpath = "//h2[text()='Because Engineers are Fans Too!']")
    private WebElementFacade mediumTitle;

    @FindBy(xpath = "//td[@class='WikiLogoName']/a")
    private WebElementFacade apiDocumentationTitle;

    public String baseTestedUrl = new DriverProperties().getEnvironmentVariables().getProperty("webdriver.base.url");

    public Map<String, WebElementFacade> getClickableElements() {
        Map<String, WebElementFacade> elements = new HashMap<String, WebElementFacade>();
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
        elements.put("LOCATE EVENTS ON A MAP", this.titleText);
        elements.put("GET STARTED WITH THE DISCOVERY API", this.titleText);
        return elements;
    }
}
