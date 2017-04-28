package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;
import net.serenitybdd.core.pages.WebElementFacade;

@ImplementedBy(FeedbackWidgetImpl.class)
public interface FeedbackWidget extends AncestorWidget {

    WebElementFacade getTitleText();
    WebElementFacade getNameLabel();
    WebElementFacade getEmailLabel();
    WebElementFacade getSubjectLabel();
    WebElementFacade getDescriptionLable();
    WebElementFacade getNameTextField();
    WebElementFacade getEmailTextField();
    WebElementFacade getSubjectDropdown();
    WebElementFacade getDescriptionTextField();
    WebElementFacade getSendButton();
    WebElementFacade getCloseButton();
    WebElementFacade getDescriptionErrorMessage();
}
