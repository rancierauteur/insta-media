# Traffic Router Bot

Petit routeur de trafic pour envoyer les clics sociaux vers les bonnes pages du site auteur, avec paramètres UTM.

## Routes intégrées

- `/go/accueil`
- `/go/marko`
- `/go/tabou`
- `/go/injustice`

## Exemples

TikTok vers la page Marko :

`/go/marko?source=tiktok&campaign=marko-septembre`

Instagram vers Tabou à Baltimore :

`/go/tabou?source=instagram&campaign=tabou-relance&content=visuel-01`

Facebook vers In-Justice à Baltimore :

`/go/injustice?source=facebook&campaign=injustice-relance`

Le bot ajoute automatiquement :

- `utm_source`
- `utm_medium=social`
- `utm_campaign`
- `utm_content` si fourni

Les redirections sont également journalisées dans les logs de fonctions Netlify avec la route, la source, la campagne et la date.

## Déploiement Netlify

Le dossier à publier est `traffic-bot`.

Le fichier `netlify.toml` configure automatiquement les fonctions et la route `/go/:slug`.
