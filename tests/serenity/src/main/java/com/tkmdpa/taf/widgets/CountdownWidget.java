package com.tkmdpa.taf.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;
import net.serenitybdd.core.pages.WebElementFacade;

@ImplementedBy(CountdownWidgetImpl.class)
public interface CountdownWidget extends AncestorWidget {

    void clickOnGetButton();
    void submitForm();
    void setApiKey(String apiKey);
    void setEventId(String eventId);
    String getEventIDTextFieldValue();
    void clickOnGetEventId();
    void enterKeyword(String keyword);
    void clickSetThisIdOnFirstEvent();
    boolean isPosterContainsText(String text);
    void clickOnGetYourOwnLink();
    void switchToTab(String tab);
    void setFullWidthMode();
    void setPosterTheme();
    void setLayoutResolution(String resolution);
    void setLayoutOrientation(String orientation);
    WebElementFacade getLayoutOrientation(String layoutOrientation);
    boolean isEventMessageContains(String text);
    String getEmbeddedApiKey();
    String getEmbeddedEventId();
    String getEmbeddedTheme();
    String getEmbeddedResolution();
    String getEmbeddedOrientation();
    WebElementFacade getEventId();
    WebElementFacade getLayoutResolution(String layoutResolution);
}
