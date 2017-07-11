package com.tkmdpa.taf.utils;

import net.thucydides.core.guice.Injectors;
import net.thucydides.core.util.EnvironmentVariables;
import net.thucydides.core.util.PropertiesFileLocalPreferences;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Properties;

/**
 * Load all properties.
 */
public class DpaProperties {

    private static final Logger LOG = LoggerFactory.getLogger(DpaProperties.class);
    private static final String ENV = System.getProperty("env");
    private static final String SERENITY_UNIQUE_PROPERTY_FILE = "src/test/resources/environment/" + ENV
            + "/serenity.properties";
    private static final String SERENITY_COMMON_PROPERTY_FILE = "src/test/resources/common_properties/serenity_common.properties";
    private static final String SERENITY_PROPERTY_FILE = "src/test/resources/serenity.properties";
    private static EnvironmentVariables environmentVariables = Injectors.getInjector()
            .getProvider(EnvironmentVariables.class).get();
    private static DpaProperties instance = new DpaProperties();
    private Properties properties;

    private DpaProperties() {
        this.properties = new Properties();
        mergeSerenityConfigsAndSave(SERENITY_UNIQUE_PROPERTY_FILE, SERENITY_COMMON_PROPERTY_FILE);
        loadSerenityPropertiesToEnvironment();
    }

    private void mergeSerenityConfigsAndSave(final String... serenityPropertyFiles) {
        try (FileOutputStream outStream = new FileOutputStream(SERENITY_PROPERTY_FILE)) {
            int character;
            for (String configFile : serenityPropertyFiles) {
                FileInputStream configFileInputStream = new FileInputStream(configFile);
                while ((character = configFileInputStream.read()) != -1) {
                    outStream.write(character);
                }
                outStream.write(System.getProperty("line.separator").getBytes());
                configFileInputStream.close();
            }
            outStream.flush();
        } catch (IOException ex) {
            LOG.error("error merging configuration files", ex);
        } finally {
            File outStream = new File(SERENITY_PROPERTY_FILE);
            outStream.deleteOnExit();
        }
    }

    private void loadSerenityPropertiesToEnvironment() {
        Properties localPreferences = new Properties();
        try (FileInputStream fileInputStream = new FileInputStream(SERENITY_PROPERTY_FILE)) {
            localPreferences.load(fileInputStream);
            Enumeration propertyNames = localPreferences.propertyNames();
            while (propertyNames.hasMoreElements()) {
                String propertyName = (String) propertyNames.nextElement();
                String localPropertyValue = localPreferences.getProperty(propertyName);
                String currentPropertyValue = environmentVariables.getProperty(propertyName);
                if ((currentPropertyValue == null) && (localPropertyValue != null)) {
                    environmentVariables.setProperty(propertyName, localPropertyValue);
                    LOG.debug("System property {} was successfully added, --> {}", propertyName, localPropertyValue);
                }
            }
            new PropertiesFileLocalPreferences(environmentVariables);
        } catch (IOException e) {
            LOG.error("error loading serenity properties", e);
        }
    }

}
