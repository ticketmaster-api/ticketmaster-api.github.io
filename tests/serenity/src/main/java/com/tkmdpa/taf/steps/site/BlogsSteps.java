package com.tkmdpa.taf.steps.site;

import com.tkmdpa.taf.pages.AnyPage;
import com.tkmdpa.taf.pages.site.BlogsPage;
import net.thucydides.core.annotations.Step;

public class BlogsSteps {

    BlogsPage blogsPage;
    AnyPage anyPage;

    @Step
    public void openPage() {
        blogsPage.open();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        anyPage.waitForPageReadyStateComplete();
        blogsPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
