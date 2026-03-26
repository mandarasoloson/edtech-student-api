# EdTech Student API - TP Intégration Continue

Ce projet est une API RESTful développée en Node.js et Express pour la gestion d'étudiants d'une école. Il a été réalisé dans le cadre d'un TP sur l'Intégration Continue (CI/CD). 

L'objectif principal de ce dépôt est de démontrer la mise en place d'un pipeline de CI robuste, incluant des tests automatisés et une vérification stricte de la qualité du code.

## Prérequis

Pour exécuter ce projet localement, vous devez avoir installé :
* Node.js (version 20.x ou 22.x recommandée)
* npm (inclus avec Node.js)

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Ouvrez un terminal à la racine du projet.
3. Installez les dépendances nécessaires avec la commande :
   ```bash
   npm install

## Commandes disponibles

Le fichier `package.json` inclut plusieurs scripts pour faciliter le développement et les tests :

* **Démarrer le serveur en mode développement :**
```bash
npm run dev
```
L'API sera accessible sur `http://localhost:3000`. Le serveur redémarrera automatiquement à chaque modification de fichier.

* **Lancer les tests automatisés :**
```bash
npm run test
```
Exécute la suite de 15 tests unitaires et d'intégration utilisant Vitest et Supertest.

* **Vérifier la qualité du code (Linter) :**
```bash
npm run lint
```
Analyse le code avec ESLint pour détecter les erreurs de syntaxe, les variables inutilisées et les problèmes d'indentation. Pour corriger automatiquement les erreurs de formatage, vous pouvez utiliser `npx eslint src/ tests/ --fix`.

## Architecture de l'API

L'API expose les routes suivantes sous le préfixe `/api/students` :

* `GET /` : Récupérer la liste de tous les étudiants.
* `GET /:id` : Récupérer les détails d'un étudiant spécifique via son ID.
* `POST /` : Ajouter un nouvel étudiant (validation stricte des champs requise).
* `PUT /:id` : Mettre à jour les informations d'un étudiant existant.
* `DELETE /:id` : Supprimer un étudiant de la base de données.
* `GET /stats` : Obtenir des statistiques globales (nombre total, moyenne générale, répartition par filière, meilleur étudiant).
* `GET /search?q=...` : Rechercher un étudiant par son prénom ou son nom.

## Intégration Continue (CI)

Ce projet utilise **GitHub Actions** pour automatiser les vérifications de qualité. Le pipeline est défini dans le fichier `.github/workflows/ci.yml`.

À chaque `push` ou `pull_request` sur la branche `main`, les étapes suivantes sont exécutées automatiquement sur un serveur distant :
1. Installation des dépendances (`npm ci`).
2. Exécution du Linter pour garantir un code propre et formaté.
3. Exécution des 15 tests automatisés.

Le pipeline utilise une stratégie de matrice (Matrix Strategy) pour valider la compatibilité du code sur les versions 20.x et 22.x de Node.js. Si une seule de ces étapes échoue, le déploiement est bloqué.