package bla.tm.steps;

import bla.tm.pages.site.BlogsPage;
import net.thucydides.core.annotations.Step;

public class BlogsSteps {

    BlogsPage blogsPage;

    @Step
    public void openPage() {
        blogsPage.open();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        blogsPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
