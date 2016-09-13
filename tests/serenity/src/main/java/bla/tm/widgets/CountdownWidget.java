package bla.tm.widgets;

import net.serenitybdd.core.annotations.ImplementedBy;
import net.serenitybdd.core.pages.WebElementFacade;

@ImplementedBy(CountdownWidgetImpl.class)
public interface CountdownWidget extends AnsestorWidget{

    WebElementFacade getAPIKeyTextField();
    WebElementFacade getEventIDTextField();
    WebElementFacade getTechnicalTab();
    WebElementFacade getVisualTab();
    WebElementFacade getPosterTab();
    WebElementFacade getFullWidthTab();
    WebElementFacade getLayout300x600Tab();
    WebElementFacade getLayout300x250Tab();
    WebElementFacade getLayoutVerticalTab();
    WebElementFacade getLayoutHorisontalTab();
    WebElementFacade getLayoutCustomTab();
    WebElementFacade getGetCodeButton();
    WebElementFacade getResetButton();
    WebElementFacade getPosterWindow();

    WebElementFacade getEventIdLink();
    WebElementFacade getKeywordField();
    WebElementFacade getSetThisId();
    WebElementFacade getGetYourOwn();
    WebElementFacade getActiveTheme();
    WebElementFacade getActiveLayoutResolution();
    WebElementFacade getActiveLayoutOrientation();
    WebElementFacade getEmbeddedHtmlCode();
    WebElementFacade getEventMessage();

    String getEmbeddedApiKey();
    String getEmbeddedEventId();
    String getEmbeddedTheme();
    String getEmbeddedResolution();
    String getEmbeddedOrientation();
}
