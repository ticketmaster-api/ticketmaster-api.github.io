package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_APIExplorerV2Steps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;
import org.jbehave.core.annotations.When;

public class PD_APIExplorerV2Definition {

    @Steps
    PD_APIExplorerV2Steps apiExplorerV2Page;

    @Given("open API Explorer V2 page")
    @When("open API Explorer V2 page")
    public void openAPIExplorerPage() {
        apiExplorerV2Page.openPage();
    }

    @When("I choose $apiGetMethod to send request")
    public void chooseMethodToSendRequest(String text){
        apiExplorerV2Page.chooseApiGetMethod(text);
    }

    @When("click GET button")
    public void clickGetButton(){
        apiExplorerV2Page.clickGetButton();
    }

    @Then("the parameters section is opened")
    public void pareameterSectionIsOpened(){
        apiExplorerV2Page.checkTheParameterSectionIsOpened();
    }

    @Then("error notification is shown on required fields")
    public void notificationIsShown(){
        apiExplorerV2Page.checkTheErrorMessageIsShown();
    }


    @Then("check general page elements for API Explorer V2 Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        apiExplorerV2Page.checkIfTitleIsCorrect();
        apiExplorerV2Page.checkGeneralPageElements(disqus, leftMenu);
    }

    @Then("check $tag is present in the source code page")
    public void checkIfTagIsPresentInThePagesSourceCode(String text){
        apiExplorerV2Page.checkIfSourceCodeContainsTag(text);
    }

    @Then("the request list contains url")
    public void requestListContainsUrl(){
        apiExplorerV2Page.checkTheRequestListContainsUrl();
    }

    @Then("the request list contains response block")
    public void requestListContainsBlock(){
        apiExplorerV2Page.checkTheRequestListContainsBlock();
    }

}
