package com.tkmdpa.taf.definitions.site;

import com.tkmdpa.taf.steps.site.SearchSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class SearchDefinition {

    @Steps
    SearchSteps searchPage;

    @Given("insert Search Parameter $string and navigate to Search page")
    public void openSearchPage(String searchRequest) {
        searchPage.insertSearchParameterAndNavigateToSearchPage(searchRequest);
    }

    @Then("check general page elements for Search Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        searchPage.checkIfTitleIsCorrect();
        searchPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
