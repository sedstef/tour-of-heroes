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
        wrap([$class: 'Xvfb', debug: true]) {
            nodejs('Default') {
                sh 'npm run-script test-ci'
            }
        }
    }
    
    stage('Functional Test'){
        wrap([$class: 'Xvfb', debug: true]) {
            nodejs('Default') {
                sh 'npm run ng e2e'
            }
        }
    }
}
