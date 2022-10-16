#!/usr/bin/env groovy

pipeline {
    agent any
    
    tools {
    	jdk 'jdk11'
        maven 'maven-3.8.6'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}