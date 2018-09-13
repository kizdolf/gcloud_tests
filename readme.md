## gCloud pubSub topics auto deployment.

Le fichier `cloudbuild.yml` doit être triggered à chaque fois qu'une nouvelle fonction est créee.
Il vas scanner le dossier cloudFunctions, en extraire les fonctions et les deploy.
Lors du deploy les topic/subscriptions manquantes vont être crées automatiquement

TODO: verifier si une fonction à été modifiée avant de la deploy:
fetch function code from gcloud, faire un diff.
Question: comment on fait si le corps de la fonction n'à pas été modifié mais ses dépendences oui ?
