package bla.tm.pages.pantheon;

import bla.tm.pages.AncestorPage;

public class EditProfilePage extends AncestorPage {

    public final String pageHeader = "EDIT PROFILE";

    public String getTitleText() {
        return this.titleText.getText();
    }

}
