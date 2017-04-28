package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_SDKsPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.interactions.Actions;

import static com.tkmdpa.taf.staticmethods.StaticMethods.findWebElementByKey;
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
        Actions actions = new Actions(sDKsPage.getDriver());
        actions.moveToElement(image).moveToElement(element).build().perform();
        sDKsPage.scrollToElement(element);
        actions.click(element).build().perform();
    }

}
