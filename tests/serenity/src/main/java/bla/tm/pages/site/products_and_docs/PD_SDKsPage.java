package bla.tm.pages.site.products_and_docs;

import bla.tm.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.thucydides.core.annotations.DefaultUrl;
import org.openqa.selenium.WebElement;

import java.util.HashMap;
import java.util.Map;

import static java.util.Optional.ofNullable;

@DefaultUrl("/products-and-docs/sdks/")
public class PD_SDKsPage extends AncestorPage {

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[1]/div/div/div/a")
    private WebElement sdkJavaButton;

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[2]/div/div/div/a")
    private WebElement sdkJavaScriptButton;

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[3]/div/div/div/a")
    private WebElement sdkScalaButton;

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[1]/div/div/a/img")
    private WebElement sdkJavaImage;

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[2]/div/div/a/img")
    private WebElement sdkJavaScriptImage;

    @FindBy(xpath = "//div[@id='main-block']/div[@class='content sdks']/div[3]/div/div/a/img")
    private WebElement sdkScalaImage;

    private Map<String, WebElement> getClickableElements() {
        Map<String, WebElement> elements = new HashMap<String, WebElement>();
        elements.put("SDK-Java Button", sdkJavaButton);
        elements.put("SDK-JavaScript Button", sdkJavaScriptButton);
        elements.put("SDK-Scala Button", sdkScalaButton);
        elements.put("SDK-Java Image", sdkJavaImage);
        elements.put("SDK-JavaScript Image", sdkJavaScriptImage);
        elements.put("SDK-Scala Image", sdkScalaImage);
        return elements;
    }

    public WebElement findWebElementByKey(String key) {
        return ofNullable(getClickableElements().get(key)).orElseThrow(
                () -> new RuntimeException("There is no such element on the page"));
    }


}
