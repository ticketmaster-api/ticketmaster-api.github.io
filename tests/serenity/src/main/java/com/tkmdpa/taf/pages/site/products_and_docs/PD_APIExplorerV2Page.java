package com.tkmdpa.taf.pages.site.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("/api-explorer/v2")
public class PD_APIExplorerV2Page extends AncestorPage {

    public final String pageHeader = "TICKETMASTER API EXPLORER V2.0";

    @FindBy(xpath = "//div[@class='api-exp-methods__select']/custom-select/div/div/select")
    private WebElementFacade apiMethodSelector;

    @FindBy(xpath = "//div[@class='api-exp-params-wrapper clearfix js-slide-wrapper']")
    private WebElementFacade parameterSection;

    @FindBy(xpath = "//p[@class='custom-input__validation-message']")
    private WebElementFacade errorIdField;

    @FindBy(id = "api-exp-get-btn")
    private WebElementFacade buttonGet;

    @FindBy(xpath = "//section[@class='panel-group']")
    private WebElementFacade blockSection;

    @FindBy(xpath = "//section[@class='row-container request']")
    private WebElementFacade urlSection;

    public WebElementFacade getParameterSection() {
        return parameterSection;
    }

    public boolean checkIfParameterSectionIsVisible() {
        return parameterSection.getWrappedElement().isDisplayed();
    }

    public boolean checkIfErrorMessageIsPresent() {
        return errorIdField.getWrappedElement().isDisplayed();
    }

    public WebElementFacade getGetButton() {
        return buttonGet;
    }

    public WebElementFacade getApiMethodSelector() {
        return apiMethodSelector;
    }

    public WebElementFacade getBlockSection() {
        return blockSection;
    }

    public WebElementFacade getUrlSection() {
        return urlSection;
    }
}
