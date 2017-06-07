package com.tkmdpa.taf.preconditions;

import org.jbehave.core.annotations.BeforeScenario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BeforeUserScenario {

    static Logger LOGGER = LoggerFactory.getLogger(BeforeUserScenario.class);

    @BeforeScenario()
    public void beforeScenario () {
        LOGGER.info("Before Scenario ...");
    }
}
