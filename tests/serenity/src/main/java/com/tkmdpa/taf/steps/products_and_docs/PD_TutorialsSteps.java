package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_TutorialsPage;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import static com.tkmdpa.taf.staticmethods.StaticMethods.findWebElementByKey;
import static org.junit.Assert.assertEquals;

public class PD_TutorialsSteps {

    PD_TutorialsPage tutorialsPage;

    @Step
    public void openPage() {
        tutorialsPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (tutorialsPage.getTitleText(), tutorialsPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        tutorialsPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void validateAndClickElement(String key) {
        WebElementFacade element = findWebElementByKey(key, tutorialsPage.getClickableElements());
        element.isEnabled();
        tutorialsPage.scrollToElement(element);
        element.click();
    }
}
