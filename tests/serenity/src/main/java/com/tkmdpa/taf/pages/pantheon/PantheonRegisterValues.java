package com.tkmdpa.taf.pages.pantheon;

import org.jbehave.core.model.ExamplesTable;
import org.jbehave.core.steps.Parameters;

public class PantheonRegisterValues {

    protected String firstName;
    protected String lastName;
    protected String companyName;
    protected String companySiteUrl;
    protected String userName;
    protected String emailAddress;

    public void getRegistrationValues(ExamplesTable valuesTable) {
        for (Parameters row : valuesTable.getRowsAsParameters()) {
            firstName = row.valueAs("firstName", String.class);
            lastName = row.valueAs("lastName", String.class);
            companyName = row.valueAs("companyName", String.class);
            companySiteUrl = row.valueAs("companySiteUrl", String.class);
            userName = row.valueAs("userName", String.class);
            emailAddress = row.valueAs("emailAddress", String.class);
        }
    }
}
