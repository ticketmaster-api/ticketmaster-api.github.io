package bla.tm.steps;

import bla.tm.pages.site.HomePage;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.WebElement;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertTrue;

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
        WebElement element = homePage.findWebElementByKey(key);
        element.isEnabled();
        element.click();
    }
}
