pipeline {
    agent any

    environment {
        DOCKER_CLIENT_IMG='sammmmmm/react-app:1.0'
        // AWS_EC2_IP = "YOUR_AWS_EC2_PUBLIC_IP" // Adresse IP de votre instance EC2
        // AWS_KEY_PATH = "/path/to/your/private-key.pem" // Chemin de la clé privée pour SSH
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Samlogy/node-aws.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    // install dependencies
                    sh 'npm i'
                    // build app
                    sh 'npm run build'
                    // run unit tests
                    sh 'npm run test:unit'
                    // build docker image
                    sh 'docker build -t $DOCKER_CLIENT_IMG .'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // run docker image
                    sh 'docker run $DOCKER_CLIENT_IMG'

                    // run integration tests
                    sh 'npm run test:integration'
                }
            }
        }

        stage('Release') {
            steps {
                  // Connexion à Docker Hub
                  withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                      sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                  }

                  // push image to docker hub
                  sh 'docker push $DOCKER_IMAGE_TAG'
                }
            }
        }

        // stage('deploy') {
        //     steps {
        //         script {
        //             // Déployer sur AWS EC2
        //             sshagent (credentials: ['aws-ssh-credentials']) {
        //                 // Copier le fichier Docker-compose ou exécuter Docker sur EC2
        //                 sh "scp -o StrictHostKeyChecking=no -i ${AWS_KEY_PATH} docker-compose.yml ec2-user@${AWS_EC2_IP}:/home/ec2-user/"
        //                 // Lancer le déploiement de l'image sur EC2
        //                 sh "ssh -o StrictHostKeyChecking=no -i ${AWS_KEY_PATH} ec2-user@${AWS_EC2_IP} 'docker-compose up -d'"
        //             }
        //         }
        //     }
        // }

    post {
        always {
            script {
                // Logout Docker Hub
                sh 'docker logout'
            }
        }
    }
}
