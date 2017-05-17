package com.tkmdpa.taf.postconditions;

import org.jbehave.core.annotations.AfterStory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AfterUserStory {

    static Logger LOGGER = LoggerFactory.getLogger(AfterUserStory.class);

    @AfterStory()
    public void afterStory (){
        LOGGER.info("After Story ...");
    }
}
