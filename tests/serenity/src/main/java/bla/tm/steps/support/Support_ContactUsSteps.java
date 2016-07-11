package bla.tm.steps.support;

import bla.tm.pages.site.support.Support_ContactUsPage;
import net.thucydides.core.annotations.Step;

public class Support_ContactUsSteps {

    Support_ContactUsPage contactUsPage;

    @Step
    public void openPage() {
        contactUsPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        contactUsPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return contactUsPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        contactUsPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
