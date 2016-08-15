package bla.tm.pages;

import net.serenitybdd.core.annotations.findby.By;

public class AnyPage extends AncestorPage {

    public void keyPageElementIsVisible(String xpath) {
        element(By.xpath(xpath)).shouldBeVisible();
    }
}
