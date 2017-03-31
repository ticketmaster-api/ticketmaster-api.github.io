package com.tkmdpa.taf.pages;

import net.serenitybdd.core.annotations.findby.By;

public class AnyPage extends AncestorPage {

    public void keyPageElementIsVisible(String xpath) {
        element(By.xpath(xpath)).shouldBeVisible();
    }
}
