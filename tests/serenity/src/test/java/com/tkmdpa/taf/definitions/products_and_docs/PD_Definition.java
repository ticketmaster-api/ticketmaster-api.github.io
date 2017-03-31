package com.tkmdpa.taf.definitions.products_and_docs;

import com.tkmdpa.taf.steps.products_and_docs.PD_Steps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_Definition {

    @Steps
    PD_Steps productsAndDocsPage;

    @Given("open Products and Docs page")
    public void openPDPage() {
        productsAndDocsPage.openPage();
    }

    @Then("check general page elements for Products and Docs Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        productsAndDocsPage.checkIfTitleIsCorrect();
        productsAndDocsPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
