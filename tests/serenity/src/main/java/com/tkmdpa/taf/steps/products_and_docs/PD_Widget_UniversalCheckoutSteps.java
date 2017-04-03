package com.tkmdpa.taf.steps.products_and_docs;

import com.tkmdpa.taf.pages.site.products_and_docs.PD_Widget_UniversalCheckoutPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class PD_Widget_UniversalCheckoutSteps {
    PD_Widget_UniversalCheckoutPage universalCheckoutPage;

    @Step
    public void openPage() {
        universalCheckoutPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (universalCheckoutPage.getTitleText(), universalCheckoutPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        universalCheckoutPage.checkGeneralPageElements(disqus, leftMenu);
    }
}
