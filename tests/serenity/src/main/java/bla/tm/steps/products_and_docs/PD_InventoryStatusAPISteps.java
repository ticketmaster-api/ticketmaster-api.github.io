package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_InventoryStatusAPIPage;
import bla.tm.pages.site.products_and_docs.PD_OauthAPIPage;
import net.thucydides.core.annotations.Step;

import static org.junit.Assert.assertEquals;

public class PD_InventoryStatusAPISteps {

    PD_InventoryStatusAPIPage inventoryStatusAPIPage;

    @Step
    public void openPage() {
        inventoryStatusAPIPage.open();
    }

    @Step
    public void maximiseBrowserWindow() {
        inventoryStatusAPIPage.maximisePageWindow();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (inventoryStatusAPIPage.getTitleText(), inventoryStatusAPIPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        inventoryStatusAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }
}