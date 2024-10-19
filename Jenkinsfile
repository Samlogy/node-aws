pipeline {
    agent {
        docker {
            image 'node:18-alpine'
        }
    }

    environment {
        DOCKER_USERNAME = 'sammmmmm'
        REPOS_NAME = 'react-app'
        DOCKER_CLIENT_IMG = 'sammmmmm/react-app'
        BRANCH_NAME = 'jenkins'
        REPOS_URL = 'https://github.com/Samlogy/node-aws.git'
        EMAIL = 'senanisammy@gmail.com'
    }

    stages {
        stage("Checkout") {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_NAME}"]], userRemoteConfigs: [[url: "${REPOS_URL}"]]])
                // script {
                //     commitSHA = sh(script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
                //     echo "Commit SHA: ${commitSHA}"
                // }
            }
        }

        stage('Build') {
            steps {
                // sh 'cd client'                  
                sh 'npm ci'
                sh 'npm run build'
                sh "sudo docker build -t ${REPOS_NAME} ."
            }
        }

        stage('Test') {
            steps {
                sh 'cd client' 
                sh "docker run ${REPOS_NAME}"
            }
        }

        stage('Release') {
            steps {
                sh 'cd client' 
                withCredentials([usernamePassword(credentialsId: 'your-docker-credentials-id', usernameVariable: 'username', passwordVariable: 'password')]) {
                    sh "docker login -u ${username} -p ${password}"
                    sh "docker tag ${REPOS_NAME} ${DOCKER_CLIENT_IMG}:${BRANCH_NAME}"
                    sh "docker push ${DOCKER_CLIENT_IMG}:${BRANCH_NAME}"
                    sh "docker rmi ${DOCKER_CLIENT_IMG}:${BRANCH_NAME}"
                    sh "docker rmi ${REPOS_NAME}"
                    stash includes: 'docker-compose.yml', name: 'utils'
                }
            }
        }
    }

    post {
        success {
            mail to: "${EMAIL}", 
                 subject: "Succès du Build : ${currentBuild.fullDisplayName}", 
                 body: "Le pipeline a réussi."
        }
        failure {
            mail to: "${EMAIL}", 
                 subject: "Échec du Build : ${currentBuild.fullDisplayName}", 
                 body: "Le pipeline a échoué. Consultez les logs pour plus d'informations."
        }
        always {
            steps {
                script {
                    sh 'docker logout'
                    junit 'test-results/junit.xml'
                }
            }
        }
    }
}
