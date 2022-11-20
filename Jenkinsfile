#!/usr/bin/env groovy

pipeline {
    agent any
    
    tools {
        jdk 'jdk11'
        maven 'maven-3.8.6'
		nodejs '19.1.0'
     }
 
    stages {
        stage('clean') {
			steps {
				sh "mvn -ntp clean"
			}	
        }
		
		stage('mvn install') {
			steps {
				sh "npm install"
			}	
        }
		
        stage('java test') {
			steps {
				sh "mvn -ntp test"
			}	
        }

        stage('frontend test') {
			steps {
				sh "npm test"
			}	
        }
	
        stage('build packaging') {
			steps {
				sh "mvn clean package -Dmaven.test.skip"
			}	
        }
    }
}