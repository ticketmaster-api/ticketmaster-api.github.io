package bla.tm.pages.site;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import org.openqa.selenium.WebElement;

import java.util.HashMap;
import java.util.Map;

import static java.util.Optional.ofNullable;

//@DefaultUrl("#HOST/")
public class HomePage extends AncestorPage {

    @FindBy(xpath = "//a[@class='tm-btn tm-btn-white rightarrow' and text()='GET YOUR API KEY']")
    private WebElement getAPIKeyButton;

    @FindBy(xpath = "//a[@class='tm-btn tm-btn-transparent rightarrow' and text()='REVIEW DOCUMENTATION']")
    private WebElement reviewDocumentationButton;

    @FindBy(xpath = "//a[@class='tm-btn tm-btn-transparent' and text()='EXPLORE THE APIs']")
    private WebElement exploreTheAPIButton;

    @FindBy(xpath = "//div[@id='timeline']/iframe[@id='twitter-widget-0']")
    private WebElement twittersList;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Android']")
    private WebElement androidLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Backend']")
    private WebElement beckendLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='iOS']")
    private WebElement iOSLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Web']")
    private WebElement webLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Tech blog']")
    private WebElement techLogLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Medium Publication']")
    private WebElement mediumPublicationLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Partner API']")
    private WebElement partnerAPILink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Deals API']")
    private WebElement dealsAPILink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Legacy docs']")
    private WebElement legacyDocsLink;

    private Map<String, WebElement> getClickableElements() {
        Map<String, WebElement> elements = new HashMap<String, WebElement>();
        elements.put("Get Your API Key", getAPIKeyButton);
        elements.put("Review Documentation", reviewDocumentationButton);
        elements.put("Explore The API", exploreTheAPIButton);
        elements.put("Android", androidLink);
        elements.put("Backend", beckendLink);
        elements.put("iOS", iOSLink);
        elements.put("Web", webLink);
        elements.put("Tech blog", techLogLink);
        elements.put("Medium Publication", mediumPublicationLink);
        elements.put("Partner API", partnerAPILink);
        elements.put("Deals API", dealsAPILink);
        elements.put("Legacy docs", legacyDocsLink);
        return elements;
    }

    public WebElement findWebElementByKey(String key) {
        return ofNullable(getClickableElements().get(key)).orElseThrow(
                () -> new RuntimeException("There is no such element on the page"));
    }

    public boolean iSDisplayedTwittersList() {
        return twittersList.isDisplayed();
    }

}
