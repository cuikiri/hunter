#!/usr/bin/env groovy

pipeline {
    agent any
    
    tools {
        jdk 'jdk11'
        maven 'maven-3.8.6'
		nodejs '19.1.0'
     }
 
    stages {
	    stage ('Initialize') {
            steps {
                sh '''
                    echo "PATH = ${PATH}"
                    echo "M2_HOME = ${M2_HOME}"
                ''' 
            }
        }
		
        stage('check java') {
			steps {
                sh "java -version"
            }
        }

        stage('clean') {
			steps {
				sh "mvn -ntp clean"
			}	
        }
		
        stage('java test') {
			steps {
				sh "mvn -ntp test"
			}	
        }

        stage('frontend-maven-plugin test') {
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