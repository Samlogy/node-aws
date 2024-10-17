pipeline {
    agent any
    environment {
        DOCKER_CLIENT_IMG = 'sammmmmm/react-app'
        BRANCH_NAME = 'jenkins'
        DOCKER_USERNAME = 'sammmmmm'
    }

    stages {
        stage("Checkout") {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_NAME}"]], userRemoteConfigs: [[url: 'https://github.com/Samlogy/node-aws.git']]])
                script {
                    commitSHA = sh(script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
                    echo "Commit SHA: ${commitSHA}"
                }
            }
        }

        stage('Build') {
            steps {
                dir('./client') {
                    sh 'sudo npm i'
                    sh 'sudo npm run build'
                    sh 'sudo docker build -t react-app .'
                }
            }
        }

        stage('Test') {
            steps {
                dir('./client') {
                    sh 'sudo docker run react-app'
                }
            }
        }

        stage('Release') {
            steps {
                dir('./client') {
                    withCredentials([usernamePassword(credentialsId: 'your-docker-credentials-id', usernameVariable: 'username', passwordVariable: 'password')]) {
                        sh "sudo docker login -u ${username} -p ${password}"
                        sh "sudo docker tag react-app ${DOCKER_CLIENT_IMG}:${BRANCH_NAME}"
                        sh "sudo docker push ${DOCKER_CLIENT_IMG}:${BRANCH_NAME}"
                        sh "sudo docker rmi ${DOCKER_CLIENT_IMG}:${BRANCH_NAME}"
                        sh "sudo docker rmi react-app"
                        stash includes: 'docker-compose.yml', name: 'utils'
                    }
                }
            }
        }
    }

    post {
        success {
            mail to: 'senanisammy@gmail.com', 
                 subject: "Succès du Build : ${currentBuild.fullDisplayName}", 
                 body: "Le pipeline a réussi."
        }
        failure {
            mail to: 'senanisammy@gmail.com', 
                 subject: "Échec du Build : ${currentBuild.fullDisplayName}", 
                 body: "Le pipeline a échoué. Consultez les logs pour plus d'informations."
        }
        always {
            steps {
                script {
                    sh 'docker logout'
                }
            }
        }
    }
}
