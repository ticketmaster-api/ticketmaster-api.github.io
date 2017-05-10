package com.tkmdpa.taf.definitions.site;

import com.tkmdpa.taf.steps.site.BlogsSteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class BlogsDefinition {

    @Steps
    BlogsSteps blogsPage;

    @Given("open Blogs page")
    public void openBlogsPage() {
        blogsPage.openPage();
    }

    @Then("check general page elements for page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        blogsPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
