package bla.tm.definitions.site;

import bla.tm.steps.BlogsSteps;
import net.thucydides.core.annotations.Managed;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

import static net.thucydides.core.annotations.ClearCookiesPolicy.BeforeEachTest;
import static org.junit.Assert.assertFalse;

public class BlogsDefinition {

    @Managed(clearCookies=BeforeEachTest)

    @Steps
    BlogsSteps blogsPage;

    @Given("open Blogs page")
    public void givenOpenBlogsPage() {
        blogsPage.maximiseBrowserWindow();
        blogsPage.openPage();
    }

    @Then("check general page elements for Blogs Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        blogsPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
