#!/usr/bin/env groovy

pipeline {
    agent any
    
    tools {
        jdk 'jdk11'
        maven 'maven-3.8.6'
		nodejs '16.16.0'
     }
 
    stages {
        stage('clean') {
			steps {
				sh "mvn -ntp clean"
			}	
        }
		
        stage('frontend test') {
			steps {
				sh "npm test"
			}	
        }
	
        stage('build packaging') {
			steps {
				sh "mvn -ntp clean package"
			}	
        }
    }
}