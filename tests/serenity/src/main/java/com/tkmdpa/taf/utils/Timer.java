package com.tkmdpa.taf.utils;

import org.apache.commons.lang3.time.StopWatch;

public class Timer {
    private final StopWatch stopWatch;

    public Timer() {
        this.stopWatch = new StopWatch();
    }

    public void resetAndStartWatch() {
        stopWatch.reset();
        stopWatch.start();
    }

    public long stopAndGetTime() {
        stopWatch.stop();
        return stopWatch.getTime();
    }

}
