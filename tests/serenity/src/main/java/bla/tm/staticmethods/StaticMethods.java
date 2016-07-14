package bla.tm.staticmethods;

import net.serenitybdd.core.pages.WebElementFacade;
import java.util.Map;
import static java.util.Optional.ofNullable;

public class StaticMethods {

    public static WebElementFacade findWebElementByKey(String key, Map<String, WebElementFacade> webElementsList) {
        return ofNullable(webElementsList.get(key)).orElseThrow(
                () -> new RuntimeException("There is no " + key + " element on the page"));
    }

}
