package bla.tm.staticmethods;

import net.serenitybdd.core.pages.WebElementFacade;
import java.util.Map;
import static java.util.Optional.ofNullable;

public class StaticMethods {

    public static WebElementFacade findWebElementByKey(String key, Map<String, WebElementFacade> webElementsList) {
        return ofNullable(webElementsList.get(key)).orElseThrow(
                () -> new RuntimeException("There is no " + key + " element on the page"));
    }

    public static WebElementFacade checkIfWebElementExist(WebElementFacade webElement) {
        return ofNullable(webElement).orElseThrow(
                () -> new RuntimeException("There is no element on the page"));
    }

    public static void waitForSomeActionHappened(int sec) {
        try {
            Thread.sleep(sec);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
    }

}
