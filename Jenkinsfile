pipeline {
    // agent {
    //     docker {
    //         image 'abhishekf5/maven-abhishek-docker-agent:v1'
    //         args '--user root -v /var/run/docker.sock:/var/run/docker.sock' // mount Docker socket to access the host's Docker daemon
    //     }
    // }

    // agent any
    
    agent {
        docker {
            image 'node:18-alpine'
        }
    }

    environment {
        DOCKER_USERNAME = 'sammmmmm'
        DOCKER_CLIENT_IMG = 'sammmmmm/react-app'
        BRANCH_NAME = 'jenkins'
        REPOS_URL = 'https://github.com/Samlogy/node-aws.git'
        EMAIL = 'senanisammy@gmail.com'
    }

    stages {
        stage("Checkout") {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: "${BRANCH_NAME}"]], userRemoteConfigs: [[url: "${REPOS_URL}"]]])
                script {
                    commitSHA = sh(script: "git log -n 1 --pretty=format:'%H'", returnStdout: true)
                    echo "Commit SHA: ${commitSHA}"
                }
            }
        }

        stage('Build') {
            steps {
                sh 'cd client'                  
                sh 'npm i'
                sh 'npm run build'
                sh 'sudo docker build -t react-app .'
            }
        }

        stage('Test') {
            steps {
                sh 'cd client' 
                sh 'docker run react-app'
            }
        }

        stage('Release') {
            steps {
                sh 'cd client' 
                withCredentials([usernamePassword(credentialsId: 'your-docker-credentials-id', usernameVariable: 'username', passwordVariable: 'password')]) {
                    sh "docker login -u ${username} -p ${password}"
                    sh "docker tag react-app ${DOCKER_CLIENT_IMG}:${BRANCH_NAME}"
                    sh "docker push ${DOCKER_CLIENT_IMG}:${BRANCH_NAME}"
                    sh "docker rmi ${DOCKER_CLIENT_IMG}:${BRANCH_NAME}"
                    sh "docker rmi react-app"
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
                }
            }
        }
    }
}
