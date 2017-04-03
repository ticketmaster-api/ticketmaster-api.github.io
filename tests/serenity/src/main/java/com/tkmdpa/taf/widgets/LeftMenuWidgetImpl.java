package com.tkmdpa.taf.widgets;


import com.tkmdpa.taf.staticmethods.MenuElements;
import net.serenitybdd.core.annotations.findby.FindBy;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.core.pages.WebElementFacade;
import org.openqa.selenium.support.pagefactory.ElementLocator;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


public class LeftMenuWidgetImpl extends AncestorWidgetImpl implements LeftMenuWidget{

    private MenuElements leftMenuElement = null;

    @FindBy(xpath = "//div[./ul[@id='scrollable-element']]")
    private WebElementFacade leftMenuWidget;


    public LeftMenuWidgetImpl(final PageObject page, final ElementLocator locator, final WebElementFacade webElement,
                              final long timeoutInMilliseconds) {
        super(page, locator, webElement, timeoutInMilliseconds);
    }

    public LeftMenuWidgetImpl(final PageObject page, final ElementLocator locator,
                              final long timeoutInMilliseconds) {
        super(page, locator, timeoutInMilliseconds);
    }

    @Override
    public WebElementFacade getLeftMenu() {
        return leftMenuWidget;
    }

    @Override
    public List<MenuElements> getAllLeftMenuObject (){
        List<MenuElements> leftMenuObject = getChildElements(leftMenuWidget);
        return leftMenuObject;
    }

    @Override
    public List<MenuElements> getSelectedLeftMenuObject(String name){
        List<MenuElements> leftMenuObject = new ArrayList<>();
        leftMenuObject.add(getSelectedChildElement(name, leftMenuWidget));
        return leftMenuObject;
    }


    public MenuElements getSelectedChildElement(String name, WebElementFacade element){


        if (element.containsElements("ul")){
            WebElementFacade childUlElement = element.thenFindAll("ul").get(0);
            for (Iterator<WebElementFacade> i = childUlElement.thenFindAll("li").iterator(); i.hasNext();) {
                WebElementFacade locator = i.next();
                WebElementFacade locatorsLink;

                if (locator.containsElements("h4/a")) {
                    locatorsLink = locator.thenFindAll("h4/a").get(0);}
                else {
                    locatorsLink = locator.thenFindAll("a").get(0);}

                if (locatorsLink.getText().contentEquals(name)){
                    leftMenuElement = new MenuElements (locatorsLink.getText(), locatorsLink.getAttribute("href"), locatorsLink, getChildElements(locator));
                    return leftMenuElement;
                }
                else {
                    getSelectedChildElement(name, locator);
                    if (leftMenuElement != null) {break;}
                }
            }
        }
        return leftMenuElement;
    }

    private List<MenuElements> getChildElements (WebElementFacade element){
        List<MenuElements> menuElement = new ArrayList<>();

        if (element.containsElements("ul"))
        {
            WebElementFacade childUlElement = element.thenFindAll("ul").get(0);
            for (Iterator<WebElementFacade> i = childUlElement.thenFindAll("li").iterator(); i.hasNext();){
                WebElementFacade locator = i.next();
                WebElementFacade locatorsLink;

                if (locator.containsElements("h4/a")) {
                    locatorsLink = locator.thenFindAll("h4/a").get(0);}
                else {
                    locatorsLink = locator.thenFindAll("a").get(0);}

                MenuElements elements = new MenuElements (locatorsLink.getText(), locatorsLink.getAttribute("href"), locatorsLink, getChildElements(locator));
                menuElement.add(elements);
            }
        }

        return menuElement;
    }

}
