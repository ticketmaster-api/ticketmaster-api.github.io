package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_Tutorials_EventSearchPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import static com.tkmdpa.taf.staticmethods.StaticMethods.findWebElementByKey;
import static org.junit.Assert.assertEquals;

public class PD_Tutorials_EventSearchSteps {

    PD_Tutorials_EventSearchPage tutorialsEventSearchPage;

    @Step
    public void openPage() {
        tutorialsEventSearchPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (tutorialsEventSearchPage.getTitleText(), tutorialsEventSearchPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsEventSearchPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void validateAndClickElement(String key) {
        WebElementFacade element = findWebElementByKey(key, tutorialsEventSearchPage.getClickableElements());
        element.isEnabled();
        tutorialsEventSearchPage.scrollToElement(element);
        element.click();
    }
}
