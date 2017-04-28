package com.tkmdpa.taf.pages.pantheon;

import com.tkmdpa.taf.pages.AncestorPage;
import net.thucydides.core.annotations.At;

@At("https://developer-acct.ticketmaster.com/user/password")
public class RequestNewPasswordPage extends AncestorPage {

    public final String pageHeader = "REQUEST NEW PASSWORD";

    public String getTitleText() {
        return this.titleText.getText();
    }

}
