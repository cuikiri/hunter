#!/usr/bin/env groovy

pipeline {
    agent any
    
    tools {
    	jdk 'jdk11'
        maven 'maven-3.8.6'
    }
    stages {
        stage('check java') {
			steps {
                sh "java -version"
            }
        }

        stage('clean') {
			steps {
				sh "chmod +x mvnw"
				sh "./mvnw -ntp clean -P-webapp"
			}	
        }
        stage('nohttp') {
			steps {
				sh "./mvnw -ntp checkstyle:check"
			}	
        }

        stage('install tools') {
			steps {
				sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:install-node-and-npm@install-node-and-npm"
			}	
        }

        stage('npm install') {
			steps {
				sh "./mvnw -ntp com.github.eirslett:frontend-maven-plugin:npm"
			}	
        }
        stage('backend tests') {
			steps {
				try {
					sh "./mvnw -ntp verify -P-webapp"
				} catch(err) {
					throw err
				} finally {
					junit '**/target/surefire-reports/TEST-*.xml,**/target/failsafe-reports/TEST-*.xml'
				}
			}	
        }

        stage('frontend tests') {
			steps {
				try {
				   sh "npm install"
				   sh "npm test"
				} catch(err) {
					throw err
				} finally {
					junit '**/target/test-results/TESTS-results-jest.xml'
				}
			}	
        }

        stage('packaging') {
			steps {
				sh "./mvnw -ntp verify -P-webapp -Pprod -DskipTests"
				archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
			}	
        }
    }
}