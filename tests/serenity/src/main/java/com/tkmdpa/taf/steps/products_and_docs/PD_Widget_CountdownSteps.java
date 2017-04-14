package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.AncestorPage;
import com.tkmdpa.taf.pages.site.products_and_docs.PD_Widget_CountdownPage;
import net.serenitybdd.core.Serenity;
import net.thucydides.core.annotations.Step;
import org.junit.Assert;
import org.openqa.selenium.support.ui.ExpectedConditions;

import static com.tkmdpa.taf.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.*;

public class PD_Widget_CountdownSteps extends PD_CommonSteps {

    PD_Widget_CountdownPage countdownWidgetPage;
    AncestorPage ancestorPage;

    @Step
    public void openPage() {
        countdownWidgetPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (countdownWidgetPage.getTitleText(), countdownWidgetPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        countdownWidgetPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        countdownWidgetPage.getLogInButton().click();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        if ("{apikey}".equals(apikey)){
            assertEquals(countdownWidgetPage.getCountdownWidget().getAPIKeyTextFieldValue(), DEFAULTKEY);
        }
        else {
            waitForSomeActionHappened(50);
            assertEquals(countdownWidgetPage.getCountdownWidget().getAPIKeyTextFieldValue(), apikey);
        }
    }

    @Step
    public void apiKeyFieldIsNotEmpty() {
        String apiKey = countdownWidgetPage.getCountdownWidget().getAPIKeyTextFieldValue();
        assertFalse(apiKey == null || apiKey.length() == 0);
    }

    @Step
    public void checkThatEventIdFieldIsNotEmpty() {
        String eventId = countdownWidgetPage.getCountdownWidget().getEventIDTextFieldValue();
        assertFalse(eventId == null || eventId.length() == 0);
    }

    @Step
    public void storeCurrentApiKey() {
        String apiKey = countdownWidgetPage.getCountdownWidget().getAPIKeyTextFieldValue();
        Serenity.getCurrentSession().put("apiKey", apiKey);
    }

    @Step
    public void storeCurrentEventId() {
        String eventId = countdownWidgetPage.getCountdownWidget().getEventIDTextFieldValue();
        Serenity.getCurrentSession().put("eventId", eventId);
    }

    @Step
    public void clickOnGetButton() {
        ancestorPage.scrollToElement( countdownWidgetPage.getCountdownWidget().getGetCodeButton());
        countdownWidgetPage.getCountdownWidget().clickOnGetButton();
    }

    @Step
    public void checkThatPopupEmbeddedCodeIsOpened() {
        assertTrue(countdownWidgetPage.getCountdownWidget().getEmbeddedHtmlCode().isDisplayed());
    }

    @Step
    public void checkThatEmbeddedCodeContainsStoredApiKey() {
        String embeddedApiKeyValue = countdownWidgetPage.getCountdownWidget().getEmbeddedApiKey();
        String apiKeyValue = (String) Serenity.getCurrentSession().get("apiKey");
        assertEquals(String.format("The embedded code api key value is: %s but the apiKey value which was stored before is: %s ", embeddedApiKeyValue, apiKeyValue), apiKeyValue, embeddedApiKeyValue);
    }

    @Step
    public void checkThatEmbeddedCodeContainsStoredEventId() {
        String embeddedEventIdValue = countdownWidgetPage.getCountdownWidget().getEmbeddedEventId();
        String eventIdValue = (String) Serenity.getCurrentSession().get("eventId");
        assertEquals(String.format("The embedded code eventId value is: %s but the eventId value which was stored before is: %s ", embeddedEventIdValue, eventIdValue), eventIdValue, embeddedEventIdValue);
    }

    @Step
    public void submitForm() {
        countdownWidgetPage.getCountdownWidget().submitForm();
        waitForSomeActionHappened(200);
    }

    @Step
    public void setApiKey(String apiKey) {
        countdownWidgetPage.getCountdownWidget().setApiKey(apiKey);
    }

    @Step
    public void setEventId(String eventId) {
        countdownWidgetPage.getCountdownWidget().setEventId(eventId);
    }

    @Step
    public void resetForm() {
        ancestorPage.scrollToElement(countdownWidgetPage.getCountdownWidget().getResetButton());
        countdownWidgetPage.getCountdownWidget().clickResetButton();
    }

    @Step
    public void checkThatApiKeyFieldContainsStoredValue() {
        String actualApiKey = countdownWidgetPage.getCountdownWidget().getAPIKeyTextFieldValue();
        String expectedApiKey = (String) Serenity.getCurrentSession().get("apiKey");
        Assert.assertEquals(String.format("The apiKey should be %s but %s", expectedApiKey, actualApiKey), expectedApiKey, actualApiKey);
    }

    @Step
    public void checkThatEventIdFieldContainsStoredValue() {
        String actualEventId = countdownWidgetPage.getCountdownWidget().getEventIDTextFieldValue();
        String expectedEventId = (String) Serenity.getCurrentSession().get("eventId");
        Assert.assertEquals(String.format("The eventId should be %s but %s", expectedEventId, actualEventId), expectedEventId, actualEventId);
    }

    @Step
    public void clickOnGetEventId() {
        ancestorPage.scrollToElement(countdownWidgetPage.getCountdownWidget().getEventId());
        countdownWidgetPage.getCountdownWidget().clickOnGetEventId();
    }

    @Step
    public void enterKeyword(String keyword) {
        countdownWidgetPage.getCountdownWidget().enterKeyword(keyword);
    }

    @Step
    public void applyFirstEventId() {
        countdownWidgetPage.getCountdownWidget().clickSetThisIdOnFirstEvent();
    }

    @Step
    public void checkThatPosterContainsText(String text) {
        assertTrue(String.format("The poster does not contains text: %s", text), countdownWidgetPage.getCountdownWidget().isPosterContainsText(text));
    }

    @Step
    public void getYourOwnApiKeyLink() {
        countdownWidgetPage.getCountdownWidget().clickOnGetYourOwnLink();
    }

    @Step
    public void checkThatPageIsOpenedWithUrl(String url) {
        countdownWidgetPage.waitFor(ExpectedConditions.urlContains(url));
    }

    @Step
    public void switchToTab(String tab) {
        countdownWidgetPage.getCountdownWidget().switchToTab(tab);
    }

    @Step
    public void setFullWidth() {
        countdownWidgetPage.getCountdownWidget().setFullWidthMode();
        Serenity.getCurrentSession().put("w-proportion", "fullwidth");
    }

    @Step
    public void checkThatEmbeddedCodeContainsStoredTheme() {
        String embeddedThemeValue = countdownWidgetPage.getCountdownWidget().getEmbeddedTheme();
        String themeValue = (String) Serenity.getCurrentSession().get("w-proportion");
        assertTrue(String.format("The embedded code theme value is: %s but the theme value which was stored before is: %s ", embeddedThemeValue, themeValue), embeddedThemeValue.equalsIgnoreCase(themeValue));
    }

    @Step
    public void setPosterTheme() {
        countdownWidgetPage.getCountdownWidget().setPosterTheme();
    }

    public void setLayoutResolutionTo(String layoutResolution) {
        ancestorPage.scrollToElement( countdownWidgetPage.getCountdownWidget().getLayoutResolution(layoutResolution));
        countdownWidgetPage.getCountdownWidget().setLayoutResolution(layoutResolution);
        Serenity.getCurrentSession().put("resolution", layoutResolution);
    }

    @Step
    public void checkThatEmbeddedCodeContainsStoredResolution() {
        String embeddedResolutionValue = countdownWidgetPage.getCountdownWidget().getEmbeddedResolution();
        String resolutionValue = (String) Serenity.getCurrentSession().get("resolution");
        assertTrue(String.format("The embedded code resolution value is: %s but the resolution value which was stored before is: %s ", embeddedResolutionValue, resolutionValue), embeddedResolutionValue.equalsIgnoreCase(resolutionValue));
    }

    @Step
    public void setLayoutOrientation(String layoutOrientation) {
        ancestorPage.scrollToElement(countdownWidgetPage.getCountdownWidget().getLayoutOrientation(layoutOrientation));
        countdownWidgetPage.getCountdownWidget().setLayoutOrientation(layoutOrientation);
        Serenity.getCurrentSession().put("orientation", layoutOrientation);
    }

    @Step
    public void checkThatEmbeddedCodeContainsStoredOrientation() {
        String embeddedOrientationValue = countdownWidgetPage.getCountdownWidget().getEmbeddedOrientation();
        String orientationValue = (String) Serenity.getCurrentSession().get("orientation");
        assertTrue(String.format("The embedded code orientation value is: %s but the orientation value which was stored before is: %s ", embeddedOrientationValue.toLowerCase(), orientationValue), embeddedOrientationValue.equalsIgnoreCase(orientationValue));
    }

    @Step
    public void checkThatEventMessageIsShown(String eventMessage) {
        assertTrue(String.format("Event message does not contains %s", eventMessage), countdownWidgetPage.getCountdownWidget().isEventMessageContains(eventMessage));
    }
}
