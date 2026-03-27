# EdTech Student API - TP Intégration Continue

![CI Status](https://github.com/mandarasoloson/edtexh-student-api/actions/workflows/ci.yml/badge.svg)

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
```

## Commandes disponibles

Le fichier `package.json` inclut plusieurs scripts pour faciliter le développement et les tests. Voici les commandes principales :

| Commande | Description | Détails |
| :--- | :--- | :--- |
| `npm run dev` | Démarre le serveur en mode développement. | Accessible sur `http://localhost:3000`. Redémarre automatiquement à chaque modification. |
| `npm run test` | Lance les tests automatisés. | Exécute la suite de 16 tests unitaires et d'intégration avec Vitest et Supertest. |
| `npm run lint` | Vérifie la qualité du code (ESLint). | Analyse le code pour détecter les erreurs de syntaxe, variables inutilisées et problèmes d'indentation. |
| `npx eslint src/ tests/ --fix` | Corrige le formatage automatiquement. | Répare les erreurs d'espacement et d'indentation remontées par le linter. |

## Documentation de l'API

Toutes les routes sont accessibles sous le préfixe `http://localhost:3000/api/students`.

### 1. Récupérer tous les étudiants (avec pagination)
* **Requête :** `GET /` ou `GET /?page=1&limit=2`
* **Réponse (200 OK) :**
```json
{
  "info": {
    "totalStudents": 5,
    "totalPages": 3,
    "currentPage": 1,
    "limit": 2
  },
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "grade": 14,
      "field": "Informatique"
    }
  ]
}
```

### 2. Ajouter un nouvel étudiant
* **Requête :** `POST /`
* **Corps de la requête (JSON) :**
```json
{
  "firstName": "Elon",
  "lastName": "Musk",
  "email": "elon@edtech.fr",
  "grade": 15,
  "field": "Informatique"
}
```
* **Réponse (201 Created) :**
```json
{
  "id": 6,
  "firstName": "Elon",
  "lastName": "Musk",
  "email": "elon@edtech.fr",
  "grade": 15,
  "field": "Informatique"
}
```

### 3. Récupérer les statistiques globales
* **Requête :** `GET /stats`
* **Réponse (200 OK) :**
```json
{
  "totalStudents": 5,
  "averageGrade": 13.8,
  "studentsByField": {
    "Informatique": 2,
    "Mathématiques": 3
  },
  "bestStudent": {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "grade": 16
  }
}
```

### 4. Autres routes disponibles
* `GET /:id` : Récupère les détails d'un étudiant spécifique.
* `PUT /:id` : Met à jour un étudiant. Le corps de la requête doit être identique à celui de la route POST.
* `DELETE /:id` : Supprime un étudiant. Renvoie `{ "message": "Étudiant supprimé avec succès" }`.
* `GET /search?q=motcle` : Recherche un étudiant par son prénom ou nom. Renvoie un tableau d'étudiants.

## Intégration Continue (CI)

Ce projet utilise **GitHub Actions** pour automatiser les vérifications de qualité. Le pipeline est défini dans le fichier `.github/workflows/ci.yml`.

À chaque `push` ou `pull_request` sur la branche `main`, les étapes suivantes sont exécutées automatiquement sur un serveur distant :
1. Installation des dépendances (`npm ci`).
2. Exécution du Linter pour garantir un code propre et formaté.
3. Exécution des 16 tests automatisés.

Le pipeline utilise une stratégie de matrice (Matrix Strategy) pour valider la compatibilité du code sur les versions 20.x et 22.x de Node.js. Si une seule de ces étapes échoue, le déploiement est bloqué.