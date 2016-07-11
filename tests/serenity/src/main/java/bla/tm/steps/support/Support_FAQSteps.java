package bla.tm.steps.support;

import bla.tm.pages.site.support.Support_FAQPage;
import net.thucydides.core.annotations.Step;

public class Support_FAQSteps {

    Support_FAQPage faqPage;

    @Step
    public void openPage() {
        faqPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        faqPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return faqPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        faqPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
