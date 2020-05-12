#!groovy

node{
    stage('Prepare'){
        checkout scm
    }
    
    stage('Build'){
        nodejs('Default') {
            sh 'npm install ng'
            sh 'npm run ng build'
        }
    }
}
