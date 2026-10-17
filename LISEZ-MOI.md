# Portfolio Albert Thierry — refonte « verre dépoli lavande »

## Structure attendue
```
portfolio/
├── index.html
├── style.css
├── script.js
├── img/   ← vos images existantes (inchangées, mêmes noms de fichiers)
└── vid/   ← vos vidéos existantes (inchangées)
```
Les trois fichiers ci-dessus remplacent vos anciens fichiers. Les dossiers `img/` et `vid/` n'ont pas été fournis : copiez-y les vôtres, aucun chemin n'a été modifié.

## Lancer
Ouvrez `index.html` dans un navigateur (ou `python3 -m http.server` dans le dossier, puis http://localhost:8000).
Les polices (Plus Jakarta Sans, Inter, Playfair Display) se chargent depuis Google Fonts : connexion requise.

## Ce qui est inchangé
Tous les textes, prix, dates, liens, numéros, partenaires, descriptions de projets, `CONFIG` du JS, filtres, galeries, lightbox, modale « Voir détails », formulaire → WhatsApp, compteurs, barres de compétences.

## Personnaliser (dans script.js, en haut, objet CONFIG)
- **Photos du héro** : déposez vos PNG détournés (fond transparent) dans `img/`, puis listez-les dans `HERO_PHOTOS`. Elles alternent toutes les 5 s (`HERO_INTERVAL`) avec une rotation 3D, et des pastilles permettent de choisir.
- **Certificats** : déposez les images dans `img/certificats/` puis ajoutez une ligne dans `CERTIFICATES` (`title`, `issuer`, `year`, `image`). La section « Mes certificats » est masquée tant que la liste est vide ; clic sur un certificat = agrandissement.
