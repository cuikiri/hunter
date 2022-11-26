#!/usr/bin/env groovy

pipeline {
    agent any
    
    tools {
        jdk 'jdk11'
		nodejs '16.16.0'
     }
 
    stages {
        stage('build packaging') {
			steps {
				sh "./mvnw -Pprod clean verify"
			}	
        }
        
        stage('frontend test') {
			steps {
				sh "npm test"
			}	
        }
    }
}