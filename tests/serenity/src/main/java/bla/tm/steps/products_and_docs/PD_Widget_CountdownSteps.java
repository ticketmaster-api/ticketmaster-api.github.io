package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_Widget_CountdownPage;
import net.serenitybdd.core.Serenity;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;
import org.junit.Assert;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static bla.tm.staticmethods.StaticMethods.*;
import static net.thucydides.core.webdriver.ThucydidesWebDriverSupport.getDriver;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class PD_Widget_CountdownSteps {

    PD_Widget_CountdownPage countdownWidgetPage;

    @Step
    public void openPage() {
        countdownWidgetPage.open();
    }

    @Step
    public void closePage() {
        countdownWidgetPage.closeWindow();
    }

    @Step
    public void maximiseBrowserWindow() {
        countdownWidgetPage.maximisePageWindow();
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
            assertEquals(countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getAttribute("value"), "5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG");
        }
        else {
            waitForSomeActionHappened(50);
            assertEquals(countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getAttribute("value"), apikey);
        }
    }

    @Step
    public void apiKeyFieldIsNotEmpty() {
        String apiKey = countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getValue();
        assertFalse(apiKey == null || apiKey.length() == 0);
    }

    @Step
    public void checkThatEventIdFieldIsNotEmpty() {
        String eventId = countdownWidgetPage.getCountdownWidget().getEventIDTextField().getValue();
        assertFalse(eventId == null || eventId.length() == 0);
    }

    @Step
    public void storeCurrentApiKey() {
        String apiKey = countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getValue();
        Serenity.getCurrentSession().put("apiKey", apiKey);
    }

    @Step
    public void storeCurrentEventId() {
        String eventId = countdownWidgetPage.getCountdownWidget().getEventIDTextField().getValue();
        Serenity.getCurrentSession().put("eventId", eventId);
    }

    @Step
    public void clickOnGetButton() {
        WebElementFacade getCodeButton = countdownWidgetPage.getCountdownWidget().getGetCodeButton();
        scrollToElement(getCodeButton);
        getCodeButton.click();
    }

    @Step
    public void checkThatPopupEmbeddedCodeIsOpened() {
        assertTrue(countdownWidgetPage.getCountdownWidget().getEmbeddedHtmlCode().isDisplayed());
        waitForSomeActionHappened(2000);
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
        countdownWidgetPage.getCountdownWidget().getEventIDTextField().sendKeys(Keys.ENTER);
    }

    @Step
    public void setApiKey(String apiKey) {
        countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().clear();
        countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().sendKeys(apiKey, Keys.ENTER);
    }

    @Step
    public void setEventId(String eventId) {
        countdownWidgetPage.getCountdownWidget().getEventIDTextField().clear();
        countdownWidgetPage.getCountdownWidget().getEventIDTextField().sendKeys(eventId);
    }

    @Step
    public void clickResetButton() {
        scrollToElement(countdownWidgetPage.getCountdownWidget().getResetButton());
        countdownWidgetPage.getCountdownWidget().getResetButton().click();
    }

    @Step
    public void checkThatApiKeyFieldContainsStoredValue() {
        String actualApiKey = countdownWidgetPage.getCountdownWidget().getAPIKeyTextField().getValue();
        String expectedApiKey = (String) Serenity.getCurrentSession().get("apiKey");
        Assert.assertEquals(String.format("The apiKey should be %s but %s", expectedApiKey, actualApiKey), expectedApiKey, actualApiKey);
    }

    @Step
    public void checkThatEventIdFieldContainsStoredValue() {
        String actualEventId = countdownWidgetPage.getCountdownWidget().getEventIDTextField().getValue();
        String expectedEventId = (String) Serenity.getCurrentSession().get("eventId");
        Assert.assertEquals(String.format("The eventId should be %s but %s", expectedEventId, actualEventId), expectedEventId, actualEventId);
    }

    @Step
    public void clickOnGetEventId() {
        scrollToElement(countdownWidgetPage.getCountdownWidget().getEventIdLink());
        countdownWidgetPage.getCountdownWidget().getEventIdLink().click();
    }

    @Step
    public void enterKeyword(String keyword) {
        countdownWidgetPage.getCountdownWidget().getKeywordField().sendKeys(keyword, Keys.ENTER);
    }

    @Step
    public void clickSetThisIdOnFirstEvent() {
        countdownWidgetPage.getCountdownWidget().getSetThisId().click();
    }

    @Step
    public void checkThatPosterContainsKeyword(String keyword) {
        String posterText = countdownWidgetPage.getCountdownWidget().getPosterWindow().getText();
        assertTrue(String.format("The poster does not contains %s but has text: %s", keyword.toLowerCase(), posterText.toLowerCase()), keyword.toLowerCase().contains(posterText.toLowerCase()));
    }

    @Step
    public void clickOnGetYourOwn() {
        countdownWidgetPage.getCountdownWidget().getGetYourOwn().click();
    }

    @Step
    public void checkThatPageIsOpenedWithUrl(String url) {
        WebDriverWait wait = new WebDriverWait(getDriver(), 10);
        wait.until(ExpectedConditions.urlContains(url));
        String currentUrl = countdownWidgetPage.returnCurrentUrl();
        assertTrue(String.format("Current URl does not contain %s", currentUrl) ,currentUrl.contains(url));
    }

    @Step
    public void switchToTab(String tab) {
        switch (tab){
            case "visual": {
                scrollToElement(countdownWidgetPage.getCountdownWidget().getVisualTab());
                countdownWidgetPage.getCountdownWidget().getVisualTab().click();
            }
            break;
            case "technical": {
                scrollToElement(countdownWidgetPage.getCountdownWidget().getTechnicalTab());
                countdownWidgetPage.getCountdownWidget().getTechnicalTab().click();
            }
            break;
            default: throw new IllegalArgumentException(String.format("The tab name: '%s' is illegal.", tab));
        }
    }

    @Step
    public void setFullWidth() {
        countdownWidgetPage.getCountdownWidget().getFullWidthTab().click();
        Serenity.getCurrentSession().put("theme", "full-width");
    }

    @Step
    public void checkThatEmbeddedCodeContainsStoredTheme() {
        String embeddedThemeValue = countdownWidgetPage.getCountdownWidget().getEmbeddedTheme();
        String themeValue = (String) Serenity.getCurrentSession().get("theme");
        assertTrue(String.format("The embedded code theme value is: %s but the theme value which was stored before is: %s ", embeddedThemeValue, themeValue), embeddedThemeValue.equalsIgnoreCase(themeValue));
    }

    @Step
    public void setPosterTheme() {
        countdownWidgetPage.getCountdownWidget().getPosterTab().click();
    }

    public void setLayoutResolutionTo(String layoutResolution) {
        switch(layoutResolution){
            case "300x250": {
                scrollToElement(countdownWidgetPage.getCountdownWidget().getLayout300x250Tab());
                countdownWidgetPage.getCountdownWidget().getLayout300x250Tab().click();
            }
                break;
            case "300x600": {
                scrollToElement(countdownWidgetPage.getCountdownWidget().getLayout300x250Tab());
                countdownWidgetPage.getCountdownWidget().getLayout300x600Tab().click();
            }
                break;
            case "custom": {
                scrollToElement(countdownWidgetPage.getCountdownWidget().getLayout300x250Tab());
                countdownWidgetPage.getCountdownWidget().getLayoutCustomTab().click();
            }
                break;
            default: throw new IllegalArgumentException(String.format("The layout resolution: '%s' is illegal.", layoutResolution));
        }
        Serenity.getCurrentSession().put("resolution", layoutResolution);
    }

    @Step
    public void checkThatEmbeddedCodeContainsStoredResolution() {
        String embeddedResolutionValue = countdownWidgetPage.getCountdownWidget().getEmbeddedResolution();
        String resolutionValue = (String) Serenity.getCurrentSession().get("resolution");
        assertTrue(String.format("The embedded code resolution value is: %s but the resulution value which was stored before is: %s ", embeddedResolutionValue, resolutionValue), embeddedResolutionValue.equalsIgnoreCase(resolutionValue));
    }

    @Step
    public void setLayoutOrientation(String layoutOrientation) {
        switch (layoutOrientation){
            case "horizontal": {
                scrollToElement(countdownWidgetPage.getCountdownWidget().getLayoutHorisontalTab());
                countdownWidgetPage.getCountdownWidget().getLayoutHorisontalTab().click();
            }
            break;
            case "vertical": {
                scrollToElement(countdownWidgetPage.getCountdownWidget().getLayoutVerticalTab());
                countdownWidgetPage.getCountdownWidget().getLayoutVerticalTab().click();
            }
            break;
            default: throw new IllegalArgumentException(String.format("Illegal layout orientation: '%s'", layoutOrientation));
        }
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
        String actualEventMessage = countdownWidgetPage.getCountdownWidget().getEventMessage().getText();
        assertTrue(actualEventMessage.contains(eventMessage));
    }
}