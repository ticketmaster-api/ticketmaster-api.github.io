package com.tkmdpa.taf.steps.site;

import com.tkmdpa.taf.pages.site.SearchPage;
import net.thucydides.core.annotations.Step;
import org.openqa.selenium.Keys;

import static org.junit.Assert.assertEquals;


public class SearchSteps {

    SearchPage searchPage;

    @Step
    public void openPage() {
        searchPage.open();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        searchPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (searchPage.getTitleText(), searchPage.pageHeader);
    }

    @Step
    public void insertSearchParameterAndNavigateToSearchPage(String text) {
        searchPage.getSearchButton().click();
        searchPage.getSearchTextInput().sendKeys(text);
        searchPage.getSearchTextInput().sendKeys(Keys.ENTER);
        //searchPage.getSearchButton().click();
    }
}
