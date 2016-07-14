package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_SDKsPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import static bla.tm.staticmethods.StaticMethods.findWebElementByKey;

public class PD_SDKsSteps {

    PD_SDKsPage sDKsPage;

    @Step
    public void openPage() {
        sDKsPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        sDKsPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return sDKsPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        sDKsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void validateAndClickElement(String key) {
        WebElementFacade element = findWebElementByKey(key, sDKsPage.getClickableElements());
        element.isEnabled();
        element.click();
    }

}
