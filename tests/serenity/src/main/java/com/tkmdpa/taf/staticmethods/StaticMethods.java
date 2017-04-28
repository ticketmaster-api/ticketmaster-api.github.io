package com.tkmdpa.taf.staticmethods;

import net.serenitybdd.core.pages.WebElementFacade;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    public static String getEmbeddedCodeAttributeValue(String rawString, String attributeName){
        Pattern pattern = Pattern.compile(attributeName + "=" + "\"([^\"]*)\"");
        Matcher matcher = pattern.matcher(rawString);
        String attrValue = null;
        while (matcher.find()) {
            attrValue = matcher.group(1);
        }
        return attrValue;
    }
}
