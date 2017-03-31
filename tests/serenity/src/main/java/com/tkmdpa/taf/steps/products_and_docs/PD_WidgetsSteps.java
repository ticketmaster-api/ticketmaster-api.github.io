package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_WidgetsPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import static com.tkmdpa.taf.staticmethods.StaticMethods.findWebElementByKey;
import static org.junit.Assert.assertEquals;

public class PD_WidgetsSteps {

    PD_WidgetsPage widgetsPage;

    @Step
    public void openPage() {
        widgetsPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (widgetsPage.getTitleText(), widgetsPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        widgetsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void switchToNewTab() {
        widgetsPage.switchToNewTab();
    }

    @Step
    public void validateAndClickElement(String key) {
        WebElementFacade element = findWebElementByKey(key, widgetsPage.getClickableElements());
        element.isEnabled();
        widgetsPage.scrollToElement(element);
        element.click();
    }
}
