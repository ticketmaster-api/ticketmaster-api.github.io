package bla.tm.steps;

import bla.tm.pages.AnyPage;
import net.thucydides.core.annotations.Step;

import static bla.tm.staticmethods.StaticMethods.waitForSomeActionHappened;
import static org.junit.Assert.assertEquals;

public class AnyPageSteps {

    AnyPage anyPage;

    @Step
    public void checkIfPageIsOpened(String url, String xpath){
        String defaultUrl = anyPage.baseTestedUrl;
//        if (defaultUrl.equals("http://developer.ticketmaster.com/")){
//            defaultUrl = defaultUrl.substring(0, defaultUrl.length()-1);
//        }
        if (url.contains("{url}")) {
            assertEquals(anyPage.returnCurrentUrl(), url.replace("{url}", defaultUrl));}
        else {
            waitForSomeActionHappened(150);
            assertEquals(anyPage.returnCurrentUrl(), url);
        };

        anyPage.keyPageElementIsVisible(xpath);
    }

}
