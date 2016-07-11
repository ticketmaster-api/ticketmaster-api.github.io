package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_SDKsPage;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.WebElement;

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
        WebElement element = sDKsPage.findWebElementByKey(key);
        element.isEnabled();
        element.click();
    }

}
