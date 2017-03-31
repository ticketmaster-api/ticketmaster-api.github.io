package com.tkmdpa.taf.pages.pantheon;

import com.tkmdpa.taf.pages.AncestorPage;

public class EditProfilePage extends AncestorPage {

    public final String pageHeader = "EDIT PROFILE";

    public String getTitleText() {
        return this.titleText.getText();
    }

}
