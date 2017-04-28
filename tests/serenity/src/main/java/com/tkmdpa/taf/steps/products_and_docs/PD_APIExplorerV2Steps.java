package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_APIExplorerV2Page;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class PD_APIExplorerV2Steps {

    PD_APIExplorerV2Page apiExplorerV2Page;

    @Step
    public void openPage() {
        apiExplorerV2Page.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (apiExplorerV2Page.getTitleText(), apiExplorerV2Page.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        apiExplorerV2Page.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void checkIfSourceCodeContainsTag(String text) {
        assertTrue (apiExplorerV2Page.getPageSource().contains(text));
    }

    @Step
    public void checkTheErrorMessageIsShown() {
        assertTrue(apiExplorerV2Page.checkIfErrorMessageIsPresent());
    }

    @Step
    public void chooseApiGetMethod(String methodName) {
        apiExplorerV2Page.selectFromDropdown( apiExplorerV2Page.getApiMethodSelector().getWrappedElement(), methodName);
    }

    @Step
    public void clickGetButton() {
        apiExplorerV2Page.getGetButton().click();
    }

    @Step
    public void checkTheParameterSectionIsOpened() {
        assertTrue(apiExplorerV2Page.getParameterSection().getWrappedElement().isDisplayed());
    }

    public void checkTheRequestListContainsUrl() {
        assertTrue(apiExplorerV2Page.getUrlSection().getWrappedElement().isDisplayed());
    }

    public void checkTheRequestListContainsBlock() {
        assertTrue(apiExplorerV2Page.getBlockSection().getWrappedElement().isDisplayed());
    }
}
