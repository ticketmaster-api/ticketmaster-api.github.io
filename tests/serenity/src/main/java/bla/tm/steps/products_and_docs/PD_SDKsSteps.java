package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_SDKsPage;
import gherkin.lexer.Th;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.By;
import org.openqa.selenium.interactions.Actions;

import static bla.tm.staticmethods.StaticMethods.findWebElementByKey;
import static bla.tm.staticmethods.StaticMethods.scrollToElement;
import static net.thucydides.core.webdriver.ThucydidesWebDriverSupport.getDriver;
import static org.junit.Assert.assertEquals;

public class PD_SDKsSteps {

    PD_SDKsPage sDKsPage;

    @Step
    public void openPage() {
        sDKsPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (sDKsPage.getTitleText(), sDKsPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        sDKsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void validateAndClickElement(String key) {
        WebElementFacade image = findWebElementByKey(key, sDKsPage.getClickableImages());
        WebElementFacade element = findWebElementByKey(key, sDKsPage.getClickableElements());
        Actions actions = new Actions(getDriver());
        actions.moveToElement(image).moveToElement(element).build().perform();
        scrollToElement(element);
        actions.click(element).build().perform();
    }

}
