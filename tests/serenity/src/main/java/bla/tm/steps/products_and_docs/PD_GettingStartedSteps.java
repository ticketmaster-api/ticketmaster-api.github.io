package bla.tm.steps.products_and_docs;

import bla.tm.pages.site.products_and_docs.PD_GettingStartedPage;
import bla.tm.staticmethods.MenuElements;
import net.serenitybdd.core.Serenity;
import net.serenitybdd.core.pages.WebElementFacade;
import net.thucydides.core.annotations.Step;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import static bla.tm.staticmethods.StaticMethods.checkIfWebElementExist;
import static bla.tm.staticmethods.StaticMethods.scrollToElement;
import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class PD_GettingStartedSteps {

    PD_GettingStartedPage gettingStartedPage;

    @Step
    public void openPage() {
        gettingStartedPage.open();
    }

    @Step
    public void checkIfTitleIsCorrect(){
        assertEquals (gettingStartedPage.getTitleText(), gettingStartedPage.pageHeader);
    }

    @Step
    public void checkGeneralPageElements(boolean disqus, boolean leftMenu){
        gettingStartedPage.checkGeneralPageElements(disqus, leftMenu);
    }

    @Step
    public void clickLogIn() {
        gettingStartedPage.getLogInButton().click();
    }

    @Step
    public void compareCommerceAPIMethodsToSameGettingStartedMethodsList(){
        WebElementFacade availableResourcesTable = gettingStartedPage.getAvailableResourcesTable();
        List<MenuElements> leftMenuObject = Serenity.sessionVariableCalled("Commerce API");
        List<MenuElements> ListOfSubMenuElements = leftMenuObject.get(0).getMenuElementsObjectsList();
        ListOfSubMenuElements.remove(ListOfSubMenuElements.size() - 1);

        for (Iterator<MenuElements> i = leftMenuObject.get(0).getMenuElementsObjectsList().iterator(); i.hasNext();){
            MenuElements item = i.next();
            String elementName = item.getElementsName();
            String elementUrl = item.getElementsUrl();
            WebElementFacade element = availableResourcesTable.thenFindAll("tr/td/a[contains(., '" + elementName + "')]").get(0);

            element.shouldBeVisible();
            scrollToElement(element);
            element.click();
            waitForSomeActionHappened(50);
            assertEquals(gettingStartedPage.returnCurrentUrl(), elementUrl);
            gettingStartedPage.open();
        }
    }

    @Step
    public void checkSummaryWidgetVisible(){
        gettingStartedPage.getSummaryWidget().shouldBeVisible();
    }

    @Step
    public void checkAPIKeyPlaceholders(String apikey) {
        //First check for non hidden elements
        for (Map.Entry<String, WebElementFacade> entry : gettingStartedPage.getAPIKeyPlaceHoldersList().entrySet()){
            String key = entry.getKey();
            WebElementFacade value = entry.getValue();
            waitForSomeActionHappened(50);
            assertTrue(checkIfWebElementExist(value).getAttribute("textContent").contains(apikey));
        }
    }
}
