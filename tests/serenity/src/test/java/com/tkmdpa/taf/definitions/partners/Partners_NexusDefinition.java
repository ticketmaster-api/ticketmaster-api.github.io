package com.tkmdpa.taf.definitions.partners;

import com.tkmdpa.taf.steps.partners.Partners_NexusSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class Partners_NexusDefinition {

    @Steps
    Partners_NexusSteps nexusSteps;

    @Given("open Join The Nexus Program page")
    public void openNexusPage() {
        nexusSteps.openPage();
    }

    @When("email is populated on Nexus Page with $name")
    public void emailIsPopulatedOnNexusForm(String email){
        nexusSteps.populateEmail(email);
    }

    @When("check $name radio button on Nexus Page")
    public void checkRadioButton(String name){
        nexusSteps.checkRadioButton(name);
    }

    @When("description is populated with $number symbols text on Nexus Page")
    public void populateDescription(int number){
        nexusSteps.populateDescription(number);
    }

    @Then("check general page elements for Join The Nexus Program Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        nexusSteps.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("message was successfully sent on Nexus form")
    public void checkThatMessageWasSent(){
        nexusSteps.checkThatEmailWesSuccessfullySent();
    }

}
