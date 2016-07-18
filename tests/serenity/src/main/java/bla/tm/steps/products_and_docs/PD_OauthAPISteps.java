package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_OauthAPIPage;
import net.thucydides.core.annotations.Step;

public class PD_OauthAPISteps {

    PD_OauthAPIPage oauthLogPage;

    @Step
    public void openPage() {
        oauthLogPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        oauthLogPage.maximisePageWindow();
    }

    @Step
    public String getTitle() {
        return oauthLogPage.getTitleText();
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        oauthLogPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
