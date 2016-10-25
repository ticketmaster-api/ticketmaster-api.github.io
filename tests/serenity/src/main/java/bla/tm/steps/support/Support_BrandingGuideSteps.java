package bla.tm.steps.support;

import bla.tm.pages.site.support.Support_BrandingGuidePage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class Support_BrandingGuideSteps {

    Support_BrandingGuidePage brandingGuidePage;

    @Step
    public void openPage() {
        brandingGuidePage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (brandingGuidePage.getTitleText(), brandingGuidePage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        brandingGuidePage.checkGeneralPageElements(disqus, leftMenu);
    }
}
