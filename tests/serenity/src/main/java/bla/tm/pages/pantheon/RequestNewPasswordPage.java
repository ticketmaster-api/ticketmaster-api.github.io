package bla.tm.pages.pantheon;

import bla.tm.pages.AncestorPage;
import net.thucydides.core.annotations.At;

@At("https://live-livenation.devportal.apigee.com/user/password")
public class RequestNewPasswordPage extends AncestorPage {

    public final String pageHeader = "REQUEST NEW PASSWORD";

    public String getTitleText() {
        return this.titleText.getText();
    }

}
