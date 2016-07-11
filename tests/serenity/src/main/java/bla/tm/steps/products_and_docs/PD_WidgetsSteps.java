package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_WidgetsPage;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.WebElement;

import static org.junit.Assert.assertTrue;

public class PD_WidgetsSteps {

    PD_WidgetsPage widgetsPage;

    @Step
    public void openPage() {
        widgetsPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        widgetsPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return widgetsPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        widgetsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public String returnCurrentUrl() {
        return widgetsPage.returnCurrentUrl();
    }

    @Step
    public void switchToNewTab() {
        widgetsPage.switchToNewTab();
    }

    public void closeAllTabs () {
        widgetsPage.closeAllTabs();
    }

    @Step
    public void validateAndClickElement(String key) {
        WebElement element = widgetsPage.findWebElementByKey(key);
        element.isEnabled();
        element.click();
    }
}
