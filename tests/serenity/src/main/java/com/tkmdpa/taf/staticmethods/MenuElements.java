package com.tkmdpa.taf.staticmethods;


import net.serenitybdd.core.pages.WebElementFacade;

import java.util.List;

public class MenuElements {
    private String elementName;
    private String elementUrl;
    private WebElementFacade clickableElement;
    private List<MenuElements> menuElementsObjectsList;

    public MenuElements(String elementName, String elementUrl, WebElementFacade clickableElement, List<MenuElements> menuElementsObjectsList){
        this.elementName = elementName;
        this.elementUrl = elementUrl;
        this.clickableElement = clickableElement;
        this.menuElementsObjectsList = menuElementsObjectsList;
    }

    public String getElementsName (){
        return this.elementName;
    }

    public String getElementsUrl (){
        return this.elementUrl;
    }

    public WebElementFacade getClickableElement (){
        return this.clickableElement;
    }

    public List<MenuElements> getMenuElementsObjectsList (){
        return this.menuElementsObjectsList;
    }
}
