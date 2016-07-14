package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_DiscoveryAPIv2Page;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.WebElement;

import java.util.Map;

import static java.util.Optional.ofNullable;
import static org.junit.Assert.assertTrue;

public class PD_DiscoveryAPIv2Steps {

    PD_DiscoveryAPIv2Page discoveryAPIv2Page;

    @Step
    public void openPage() {
        discoveryAPIv2Page.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        discoveryAPIv2Page.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return discoveryAPIv2Page.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        discoveryAPIv2Page.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public String returnCurrentUrl() {
        return discoveryAPIv2Page.returnCurrentUrl();
    }

    @Step
    public void clickLogIn() {
        discoveryAPIv2Page.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        //First check for non hidden elements
        for (Map.Entry<String, WebElementFacade> entry : discoveryAPIv2Page.getAPIKeyPlaceHoldersList().entrySet()){
            String key = entry.getKey();
            WebElement value = entry.getValue();
            try {
                Thread.sleep(100);
            } catch(InterruptedException ex) {
                Thread.currentThread().interrupt();
            }
            ofNullable(value).orElseThrow(
                    () -> new RuntimeException("There is no " + key + " element on the page"));
            assertTrue(value.getAttribute("textContent").contains(apikey));
        }

        //Second check for hidden elements
        discoveryAPIv2Page.getCodeSection().click();
        discoveryAPIv2Page.getSwitchToCUrlCode().click();

        for (Map.Entry<String, WebElementFacade> entry : discoveryAPIv2Page.getAPIKeyHiddenPlaceHoldersList().entrySet()){
            String key = entry.getKey();
            WebElement value = entry.getValue();
            try {
                Thread.sleep(100);
            } catch(InterruptedException ex) {
                Thread.currentThread().interrupt();
            }
            ofNullable(value).orElseThrow(
                    () -> new RuntimeException("There is no " + key + " element on the page"));
            assertTrue(value.getAttribute("textContent").contains(apikey));
        }

        discoveryAPIv2Page.closeWindow();
    }
}
