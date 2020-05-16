#!groovy

properties([
    buildDiscarder(logRotator(numToKeepStr: '10'))
    ])

node{

    stage('Prepare'){
        checkout scm

        nodejs('Default') {
            sh 'npm install'
        }
    }

    stage('Build'){
        nodejs('Default') {
            sh 'node_modules/.bin/ng build'
        }
    }

    stage('Test'){
        wrap([$class: 'Xvfb', debug: true]) {
            nodejs('Default') {
                sh 'npm run-script test-ci'
            }
        }
    }

    stage('Static Analysis'){
        withSonarQubeEnv(credentialsId: '6a31ddf9-f37a-4d5b-9121-836b90abfe76') {
            nodejs('Default') {
                sh 'node sonar-analyse.js'
            }
        }
    }
    
    stage('Functional Test'){
        //see https://www.browserstack.com/local-testing/binary-params
        browserstack(credentialsId: 'bd869689-b150-47e2-a1de-8344509f756d') {
            nodejs('Default') {
                sh 'node_modules/.bin/ng e2e --protractorConfig=e2e/browserstack_local.conf.js --port 4502'
            }
        }
    }
}
