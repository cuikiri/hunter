#!/usr/bin/env groovy

pipeline {
	node {
	    stage('checkout') {
	        checkout scm
	    }
	
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