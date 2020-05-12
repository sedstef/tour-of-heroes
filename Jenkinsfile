#!groovy

node{
    
    stage('Prepare'){
        checkout scm

        nodejs('Default') {
            sh 'npm install ng'
        }
    }
    
    stage('Build'){
        nodejs('Default') {
            sh 'npm run ng build'
        }
    }
    
    stage('Test'){
        nodejs('Default') {
            sh 'npm run ng test'
        }
    }
    
    stage('Functional Test'){
        nodejs('Default') {
            sh 'npm run ng e2e'
        }
    }
}
