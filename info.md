# Jenkins

- est un outil qui permet d'automatisé l'integration continue et la livraison continue en utilisant des pipelines
- jenkins surveille un depot github ou autres des un evenement: push, pull_request, commit, survient il declanche la pipeline.
- jenkins utilise un ensemble de plugins gratuits qui lui permet notament de gartir une compatibilité avec d'autre techno: docker, maven, kubernetes, ...
- **pros**:
  - ameliore la collaboration.
  - automatise le processus d'integration et de livraison.
  - ameliore la qualité de code.
  - large communauté.
  - compatibilité avec d'autre techno (plugins).
  - open source.
  - compatibilité multi environnements: windows, linux, mac.
- **cons**:
  - interface utilisateur: moins intuitive, vieillotte.
  - compléxité de configuration: comparé a des outils plus recents.
  - maintenance: etant auto-heberger jenkins necessite d'etre maintenant.
  - gestion de plugins: la mise a jour des plugins peut casser la configuration.

## Getting started

Using docker

- `docker compose up --build`
- mount a volume in local fodler "jenkins_data"

- allows jenkins user + allows permission:

```bash
sudo chmod -R 775 ./volumes/jenkins_data
sudo chown -R 1000:1000 ./volumes/jenkins_data
```

- go to `http://localhost:8080/`, enter a password given in shell.
- install plugins, create a user account

- configuration url => `http://localhost:8080/jenkins`
- credentials username/password: `jenkins`/`jenkins`

**Pipelines**

- Freestyle pipeline:

  - projets simples, tâches basiques
  - facile à configurer,
  - peu flexible
  - non versionné

- Single pipeline:

  - projets complexes, pipelines CI/CD avancés,
  - tres flexibles, versionné,
  - courbe d'apprentissage, maintenance

- Multibranch pipeline:
  - ideal dans les projets avec plusieurs branches et environnements (dev, test, stagging, production, ...)
  - automatiser des pipeline CI/CD independant par branche
  - necessite plus ressources, complexe a configurer.
