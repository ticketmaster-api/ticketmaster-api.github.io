package com.tkmdpa.taf.staticmethods;

import com.tkmdpa.taf.pages.AncestorPage;
import com.tkmdpa.taf.utils.Timer;
import net.serenitybdd.core.pages.WebElementFacade;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.Optional.ofNullable;
import static net.thucydides.core.webdriver.ThucydidesWebDriverSupport.getDriver;

public class StaticMethods {

    private static final Logger LOG = LoggerFactory.getLogger(StaticMethods.class);

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
            LOG.info(String.valueOf(ex));
            Thread.currentThread().interrupt();
        }
    }

    public static void waitForAjaxToComplete(final AncestorPage page) {
        Timer timer = new Timer();
        timer.resetAndStartWatch();
        try {
            page.waitFor(
                    v -> (Boolean) page.evaluateJavascript("return window.jQuery != undefined && jQuery.active == 0;"));
            LOG.info("ajax execution on page took about {} milliseconds", timer.stopAndGetTime());
        } catch (org.openqa.selenium.TimeoutException te) {
            LOG.error("ajax wait exceeded timeout, proceeding with test anyway\nmessage: ", te);
        }
    }

    public static void waitForPageReadyStateComplete(final AncestorPage page) {
        Timer timer = new Timer();
        timer.resetAndStartWatch();
        try {
            page.waitFor(v -> ((String) page.evaluateJavascript("return document.readyState")).equals("complete"));
            LOG.info("{} additional loading time took about {} milliseconds", page.getClass().getSimpleName(),
                    timer.stopAndGetTime());
        } catch (org.openqa.selenium.TimeoutException te) {
            LOG.error("Page loading wait exceeded timeout, proceeding with test anyway\nmessage: ", te);
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

    public static void clearCookies() {
        getDriver().manage().deleteAllCookies();
    }

    public static void reloadPage() {
        getDriver().navigate().refresh();
    }
}
