package bla.tm.definitions.site.products_and_docs;

import bla.tm.steps.products_and_docs.PD_InventoryStatusAPISteps;
import net.thucydides.core.annotations.Steps;
import org.jbehave.core.annotations.Given;
import org.jbehave.core.annotations.Then;

public class PD_InventoryStatusAPIDefinition {

    @Steps
    PD_InventoryStatusAPISteps inventoryStatusAPIPage;

    @Given("open Inventory Status API page")
    public void openInventoryStatusAPIPage() {
        inventoryStatusAPIPage.maximiseBrowserWindow();
        inventoryStatusAPIPage.openPage();
    }

    @Then("check general page elements for  Inventory Status API Page, where DISQUS = $disqus and LeftMenu = $leftMenu")
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        inventoryStatusAPIPage.checkIfTitleIsCorrect();
        inventoryStatusAPIPage.checkGeneralPageElements(disqus, leftMenu);
    }

}
