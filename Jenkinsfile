pipeline {
    // agent any
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKER_CLIENT_IMG='sammmmmm/react-app'
        BRANCH_NAME = "jenkins"
        DOCKER_USERNAME = "sammmmmm"

        // AWS_EC2_IP = "YOUR_AWS_EC2_PUBLIC_IP" // Adresse IP de votre instance EC2
        // AWS_KEY_PATH = "/path/to/your/private-key.pem" // Chemin de la clé privée pour SSH
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${BRANCH_NAME}", url: 'https://github.com/Samlogy/node-aws.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    dir('./client') {
                        sh 'sudo npm i'
                        sh 'sudo npm run build'
                        // sh 'sudo npm run test:unit'
                        sh 'sudo docker build -t $DOCKER_CLIENT_IMG .'
                    }                    
                }
            }
        }

        stage('Test') {
            steps {
                dir('./client') {
                    sh 'sudo docker run $DOCKER_CLIENT_IMG'
                    // sh 'sudo npm run test:integration'
                } 
            }
        }

        stage('Release') {
            steps {
                    dir('./client') {
                        withCredentials([usernamePassword(credentialsId: 'sammmmmm', usernameVariable: 'username',
                passwordVariable: 'password')]) {
                            // sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                            
                            sh "sudo docker login -u $DOCKER_USERNAME -p $password"
                            sh "sudo docker tag react-app $DOCKER_CLIENT_IMG:$BRANCH_NAME"
                            sh "sudo docker push $DOCKER_CLIENT_IMG:$BRANCH_NAME"
                            sh "sudo docker rmi $DOCKER_CLIENT_IMG:$BRANCH_NAME"
                            sh "sudo docker rmi react-app"
                            stash includes: 'docker-compose.yml', name: 'utils'

                        }
                        sh 'docker push $DOCKER_IMAGE_TAG'
                    }                   
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
            script {
                sh 'docker logout'
            }
        }
    }
}