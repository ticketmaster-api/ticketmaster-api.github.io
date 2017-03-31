package com.tkmdpa.taf.definitions.pantheon;

import com.tkmdpa.taf.pages.pantheon.PantheonRegisterValues;
import com.tkmdpa.taf.steps.pantheon.CreateNewAccountSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;
import org.jbehave.core.model.ExamplesTable;

public class CreateNewAccountDefinition extends PantheonRegisterValues {

    @Steps
    CreateNewAccountSteps createNewAccountPage;

    @Then("check general page elements for Pantheon Create New Account page")
    public void checkGeneralPageElements(){
        createNewAccountPage.checkIfTitleIsCorrect();
        createNewAccountPage.checkGeneralPageElements();
    }

    @When("enter register values on Create New Account Page:$table")
    public void enterRegistrationValuesOnCreateNewAccountPage(ExamplesTable valuesTable){
        getRegistrationValues(valuesTable);
        createNewAccountPage.enterValuesToFields(firstName, lastName, companyName, companySiteUrl, userName, emailAddress);
    }

    @When("click Create New Account on Register Page")
    public void clickCreateNewAccountOnRegisterPage(){
        createNewAccountPage.clickCreateNewAccountButton();
    }

    @When("click checkbox Terms of Use")
    public void clickOnTermOfUse(){
        createNewAccountPage.clickTermOfUse();
    }

}
