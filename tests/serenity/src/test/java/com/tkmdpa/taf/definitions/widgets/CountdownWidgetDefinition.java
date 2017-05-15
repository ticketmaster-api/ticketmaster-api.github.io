package com.tkmdpa.taf.definitions.widgets;

import com.tkmdpa.taf.definitions.site.CommonDefinition;
import com.tkmdpa.taf.steps.site.AnyPageSteps;
import com.tkmdpa.taf.steps.pantheon.UserAccountSteps;
import com.tkmdpa.taf.steps.pantheon.UserLogInSteps;
import com.tkmdpa.taf.steps.products_and_docs.PD_Widget_CountdownSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static net.serenitybdd.core.Serenity.getCurrentSession;

public class CountdownWidgetDefinition extends CommonDefinition {

    @Steps
    PD_Widget_CountdownSteps countdownWidgetSteps;

    @Steps
    AnyPageSteps anyPageSteps;

    @Steps
    UserLogInSteps userLogInPage;

    @Steps
    UserAccountSteps userAccountSteps;

    /**
     * Given
     */
    @Given("store ApiKey and EventId on Countdown Widget page")
    public void storeApiKeyAndEventIdOnCountdownWidgetPage() {
        countdownWidgetSteps.storeCurrentApiKey();
        countdownWidgetSteps.storeCurrentEventId();
    }

    @Given("change value for ApiKey and EventId on Countdown Widget page")
    public void changeValueForApiKeyAndEventIdOnCountdownWidgetPage() {
        String apiKey = "anyApiKey";
        String eventId = "anyEventId";
        countdownWidgetSteps.setApiKey(apiKey);
        countdownWidgetSteps.setEventId(eventId);
    }

    @When("get eventId by keyword $keyword")
    @Given("get eventId by keyword $keyword")
    public void getEventIdByKeyword(String keyword) {
        countdownWidgetSteps.clickOnGetEventId();
        countdownWidgetSteps.enterKeyword(keyword);
    }

    @Given("switch to VISUAL Tab")
    public void switchToVisualTab() {
        countdownWidgetSteps.switchToTab("visual");
    }

    @Given("set theme to full-width")
    public void setThemeToFullWidth() {
        countdownWidgetSteps.setFullWidth();
    }

    @Given("set theme to poster")
    public void setThemeToPoster() {
        countdownWidgetSteps.setPosterTheme();
    }

    @Given("set layout resolution to $layoutResolution")
    public void setLayoutResolution(String layoutResolution) {
        countdownWidgetSteps.setLayoutResolutionTo(layoutResolution);
    }

    @Given("set layout orientation to $orientation")
    public void setLayoutOrientation(String orientation) {
        countdownWidgetSteps.setLayoutOrientation(orientation);
    }

    @Given("enter custom ApiKey $apiKey")
    public void enterCustomApiKey(String apiKey) {
        countdownWidgetSteps.setApiKey(apiKey);
    }

    @Given("enter custom EventId $eventId")
    public void enterCustomEventId(String eventId) {
        countdownWidgetSteps.setEventId(eventId);
    }

    /**
     * When
     */
    @When("click on \"Get code\" button")
    public void clickOnGetCodeButton() {
        countdownWidgetSteps.clickOnGetButton();
    }

    @When("submit form")
    public void submitForm() {
        countdownWidgetSteps.submitForm();
    }

    @When("click reset button")
    public void clickResetButton() {
        countdownWidgetSteps.resetForm();
    }

    @When("set first eventId from list")
    public void setFirstEventIdFromList() {
        countdownWidgetSteps.applyFirstEventId();
    }

    @When("I click on the 'Get your own' link to get api key")
    public void clickOnTheGetYourOwnLinkToGetApiKey() {
        countdownWidgetSteps.getYourOwnApiKeyLink();
    }

    /**
     * Then
     */
    @Then("check general page elements for Countdown Widget Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        countdownWidgetSteps.checkIfTitleIsCorrect();
        countdownWidgetSteps.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check that API key is provided for all placeholders on Countdown Widget page")
    public void checkAPIKeyPlaceholders(){
        String tempApiKey = (String) getCurrentSession().get("apiKey");
        if (tempApiKey == null || tempApiKey.isEmpty()){
            countdownWidgetSteps.checkAPIKeyPlaceholders(apiKey);
        }
        else
            countdownWidgetSteps.checkAPIKeyPlaceholders(tempApiKey);
    }

    @Then("the required fields are not empty on the Countdown Widget page")
    public void checkThatRequiredFieldsAreNotEmptyOnTheCountdownWidgetPage() {
        countdownWidgetSteps.apiKeyFieldIsNotEmpty();
        countdownWidgetSteps.checkThatEventIdFieldIsNotEmpty();
    }

    @Then("the pop-up Embedded Code is opened")
    public void checkThatPopupEmbeddedCodeIsOpened() {
        countdownWidgetSteps.checkThatPopupEmbeddedCodeIsOpened();
    }

    @Then("embedded html code contains stored ApiKey and EventId")
    public void checkThatEmbeddedHtmlCodeContainsStoredApiKeyAndEvendId() {
        countdownWidgetSteps.checkThatEmbeddedCodeContainsStoredApiKey();
        countdownWidgetSteps.checkThatEmbeddedCodeContainsStoredEventId();
    }

    @Then("the ApiKey and EventId fields have stored values")
    public void checkThatApiKeyAndEventIdFieldsHaveStoredValues() {
        countdownWidgetSteps.checkThatApiKeyFieldContainsStoredValue();
        countdownWidgetSteps.checkThatEventIdFieldContainsStoredValue();
    }

    @Then("the event poster contains $keyword")
    public void checkThatEventPosterContainskeyword(String keyword) {
        countdownWidgetSteps.checkThatPosterContainsText(keyword);
    }

    @Then("The page is opened with url $url")
    public void checkThatPageIsOpenedWithUrl(String url) {
        countdownWidgetSteps.checkThatPageIsOpenedWithUrl(url);
    }

    @Then("embedded html code contains stored theme")
    public void checkThatEmbeddedHtmlCodeContainsStoredTheme() {
        countdownWidgetSteps.checkThatEmbeddedCodeContainsStoredTheme();
    }

    @Then("embedded html code contains stored layout resolution")
    public void checkThatEmbeddedHtmlCodeContainsStoredLayoutResolution() {
        countdownWidgetSteps.checkThatEmbeddedCodeContainsStoredResolution();
    }

    @Then("embedded html code contains stored layout orientation")
    public void checkThatEmbeddedHtmlCodeContainsStoredLayoutOrientation() {
        countdownWidgetSteps.checkThatEmbeddedCodeContainsStoredOrientation();
    }

    @Then("the event message is shown \"$message\"")
    public void checkThatEventMessageIsShown(String message) {
        countdownWidgetSteps.checkThatEventMessageIsShown(message);
    }
}
