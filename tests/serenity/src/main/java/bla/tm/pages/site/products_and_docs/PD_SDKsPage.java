package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

import java.util.HashMap;
import java.util.Map;

@DefaultUrl("/products-and-docs/sdks/")
public class PD_SDKsPage extends AncestorPage {

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[1]/div/div/div/a")
    private WebElementFacade sdkJavaButton;

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[2]/div/div/div/a")
    private WebElementFacade sdkJavaScriptButton;

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[3]/div/div/div/a")
    private WebElementFacade sdkScalaButton;

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[1]/div/div/a/img")
    private WebElementFacade sdkJavaImage;

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[2]/div/div/a/img")
    private WebElementFacade sdkJavaScriptImage;

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[3]/div/div/a/img")
    private WebElementFacade sdkScalaImage;

    public Map<String, WebElementFacade> getClickableElements() {
        Map<String, WebElementFacade> elements = new HashMap<String, WebElementFacade>();
        elements.put("SDK-Java Button", sdkJavaButton);
        elements.put("SDK-JavaScript Button", sdkJavaScriptButton);
        elements.put("SDK-Scala Button", sdkScalaButton);
        elements.put("SDK-Java Image", sdkJavaImage);
        elements.put("SDK-JavaScript Image", sdkJavaScriptImage);
        elements.put("SDK-Scala Image", sdkScalaImage);
        return elements;
    }
}
