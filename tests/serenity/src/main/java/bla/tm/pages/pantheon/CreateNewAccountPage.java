package bla.tm.pages.pantheon;

import bla.tm.pages.AncestorPage;
import net.thucydides.core.annotations.At;

@At("https://live-livenation.devportal.apigee.com/user/register")
public class CreateNewAccountPage extends AncestorPage {

    public final String pageHeader = "CREATE NEW ACCOUNT";

    public String getTitleText() {
        return this.titleText.getText();
    }
}
