package bla.tm.steps;

import bla.tm.pages.site.HomePage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import static bla.tm.staticmethods.StaticMethods.findWebElementByKey;

public class HomePageSteps {

    HomePage homePage;

    @Step
    public void openPage() {
        homePage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        homePage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return homePage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        homePage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public String returnCurrentUrl() {
        return homePage.returnCurrentUrl();
    }

    @Step
    public boolean isDisplayedTwittersList() {
        return homePage.iSDisplayedTwittersList();
    }

    @Step
    public void validateAndClickElement(String key) {
        WebElementFacade element = findWebElementByKey(key, homePage.getClickableElements());
        element.isEnabled();
        element.click();
    }
}
