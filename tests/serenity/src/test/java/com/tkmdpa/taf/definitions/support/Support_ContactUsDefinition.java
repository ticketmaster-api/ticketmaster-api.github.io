package com.tkmdpa.taf.definitions.support;

import com.tkmdpa.taf.steps.AnyPageSteps;
import com.tkmdpa.taf.steps.support.Support_ContactUsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

import static com.tkmdpa.taf.staticmethods.StaticMethods.waitForSomeActionHappened;

public class Support_ContactUsDefinition {

    @Steps
    AnyPageSteps anyPageSteps;

    @Steps
    Support_ContactUsSteps contactUsPage;

    @Given("open Contact Us page")
    public void givenOpenContactUsPage() {
        contactUsPage.openPage();
    }

    @When("name is populated on Contact Us Page with $text")
    public void nameIsPopulatedOnContactUsPage(String text){
        contactUsPage.populateNameField(text);
    }

    @When("email is populated on Contact Us Page with $text")
    public void emailIsPopulatedOnContactUsPage(String text){
        contactUsPage.populateEmailField(text);
    }

    @When("description is populated with $number symbols text on Contact Us Page")
    public void descriptionIsPopukatedWith(int number){
        waitForSomeActionHappened(500);
        contactUsPage.populateDescription(number);
    }

    @When("click send button")
    public void clickSend(){
        anyPageSteps.clickSendButton();
    }

    @Then("check general page elements for Contact Us Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        contactUsPage.checkIfTitleIsCorrect();
        contactUsPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
