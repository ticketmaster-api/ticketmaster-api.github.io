package bla.tm.pages.site;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import java.util.HashMap;
import java.util.Map;

//@DefaultUrl("#HOST/")
public class HomePage extends AncestorPage {

    public final String pageHeader = "WELCOME TO\n" +
                                     "THE FAN-CENTRIC\n" +
                                     "PLATFORM.";

    @FindBy(xpath = "//a[@class='tm-btn tm-btn-white rightarrow' and text()='GET YOUR API KEY']")
    private WebElementFacade getAPIKeyButton;

    @FindBy(xpath = "//a[@class='tm-btn tm-btn-transparent rightarrow' and text()='REVIEW DOCUMENTATION']")
    private WebElementFacade reviewDocumentationButton;

    @FindBy(xpath = "//a[@class='tm-btn tm-btn-transparent' and text()='EXPLORE THE APIs']")
    private WebElementFacade exploreTheAPIButton;

    @FindBy(xpath = "//div[@id='timeline']/iframe[@id='twitter-widget-0']")
    private WebElementFacade twittersList;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Android']")
    private WebElementFacade androidLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Backend']")
    private WebElementFacade beckendLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='iOS']")
    private WebElementFacade iOSLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Web']")
    private WebElementFacade webLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Tech blog']")
    private WebElementFacade techLogLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Medium Publication']")
    private WebElementFacade mediumPublicationLink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Partner API']")
    private WebElementFacade partnerAPILink;

    @FindBy(xpath = "//div[@class='col-xs-12 col-sm-8 col-lg-12']/ul/li/a[text()='Legacy docs']")
    private WebElementFacade legacyDocsLink;

    @FindBy(xpath = "//nav[@id='menu']/a[contains(.,'Open Source')]")
    private WebElementFacade openSourceMenuItem;

    @FindBy(xpath = "//div[@class='row-container wrap-overflow']/ul[@class='events-tracker events-tracker_col-view events-tracker_col-blue']")
    private WebElementFacade summaryWidget;

    public Map<String, WebElementFacade> getClickableElements() {
        Map<String, WebElementFacade> elements = new HashMap<String, WebElementFacade>();
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
        elements.put("Legacy docs", legacyDocsLink);
        elements.put("Open Source", openSourceMenuItem);
        return elements;
    }

    public boolean iSDisplayedTwittersList() {
        return twittersList.isDisplayed();
    }

    public WebElementFacade getSummaryWidget() {
        return  summaryWidget;
    }
}
