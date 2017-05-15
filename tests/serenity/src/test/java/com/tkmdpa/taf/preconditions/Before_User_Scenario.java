package com.tkmdpa.taf.preconditions;

import org.jbehave.core.annotations.BeforeScenario;

public class Before_User_Scenario {

    @BeforeScenario()
    public void beforeEachScenario () {
        System.out.println("Before Scenario ...");
    }
}
