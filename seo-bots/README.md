# SEO Bots — Cédric Rancier

Suite SEO automatisée pour séparer clairement les territoires de recherche de **Cédric Rancier**, **Arcana California**, **Fièvre Écarlate** et **Zomburger**.

> Wenauteurs est volontairement exclu tant que le label n'est pas finalisé.

## Ce que font les bots

### 1. `seo_bot.py` — Audit + cannibalisation + maillage
- explore le site en respectant `robots.txt` ;
- utilise `sitemap.xml` quand il existe ;
- contrôle title, meta description, H1, canonical, lang, noindex, contenu maigre, images sans alt, JSON-LD ;
- repère les titles/descriptions dupliqués ;
- attribue chaque page à un univers SEO ;
- signale quand plusieurs pages attaquent fortement le même mot-clé prioritaire ;
- propose des liens internes vers la page-hub la plus forte de chaque univers ;
- produit `pages.csv`, `pages.json`, `cannibalisation.json`, `maillage.json` et `rapport-seo.md`.

### 2. `gsc_bot.py` — Opportunités Google Search Console
Avec une connexion Search Console :
- récupère requêtes, pages, clics, impressions, CTR et position moyenne ;
- classe les requêtes dans le bon univers ;
- repère les requêtes proches de la première page ;
- repère les pages bien placées mais avec un CTR faible ;
- signale les requêtes encore sans propriétaire SEO clair.

### 3. `content_bot.py` — Idées de contenus basées sur les recherches réelles
Transforme les données GSC en sujets à travailler **sans mélanger les univers**.

### 4. `run_weekly.py` — Orchestrateur
Lance l'audit technique puis, si Search Console est configurée, les opportunités et idées de contenus.

## Démarrage local

```bash
cd seo-bots
python -m venv .venv
# Windows : .venv\\Scripts\\activate
# macOS/Linux : source .venv/bin/activate
pip install -r requirements.txt
python seo_bot.py --url "https://TON-SITE.fr" --out reports
```

Le rapport principal est ensuite dans `reports/rapport-seo.md`.

## Configuration des territoires SEO

Tout se règle dans `config/seo_targets.yml`.

Principe : **une intention de recherche = un univers propriétaire = une page principale**.

Les quatre territoires actuellement définis sont :
- Cédric Rancier ;
- Arcana California ;
- Fièvre Écarlate ;
- Zomburger.

Quand les URLs définitives des pages-hubs sont connues, les renseigner dans `target_url`. Sinon le bot choisit automatiquement la page la plus forte du silo comme hub provisoire.

## GitHub Actions

Le workflow fourni lance un audit chaque lundi à 06:17 UTC et peut aussi être lancé manuellement.

Pour l'activer dans GitHub, créer le secret :
- `SEO_SITE_URL` = URL du site à auditer.

Le rapport est déposé comme artefact GitHub Actions.

## Google Search Console — optionnel mais recommandé

1. Créer/choisir un projet Google Cloud.
2. Activer l'API Google Search Console.
3. Créer un compte de service et lui donner accès à la propriété Search Console.
4. Télécharger le JSON de credentials.
5. Définir :

```bash
export GSC_SITE_URL="https://TON-SITE.fr/"
export GOOGLE_APPLICATION_CREDENTIALS="/chemin/credentials.json"
python gsc_bot.py
python content_bot.py
```

Le bot GSC est en lecture seule.

## Ce que la suite ne fait pas

Elle ne génère ni faux clics, ni faux backlinks, ni pages-spam, ni commentaires automatiques. Elle automatise l'analyse et les recommandations SEO utiles sans chercher à manipuler artificiellement les moteurs.
