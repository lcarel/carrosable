# Tutoriel — Ajouter une nouvelle balade

## Étape 1 — Ouvrir le fichier de données

Ouvre le fichier `data/trails.ts`. C'est ici que toutes les balades sont stockées, sous forme d'un tableau d'objets TypeScript.

---

## Étape 2 — Copier un modèle

Copie l'un des objets existants dans le tableau `trails` et modifie-le. Voici un modèle vierge :

```typescript
{
  id: 'nom-de-la-balade-en-kebab-case',      // ⚠️ DOIT être unique (ex: 'promenade-bords-de-seine')
  name: 'Nom de la balade',                   // Nom affiché sur le site
  location: 'Nom de la ville / lieu',
  region: 'Nom de la région',                 // Ex: 'Île-de-France', 'Occitanie'
  description: 'Description détaillée...',    // Quelques phrases sur le parcours

  distance: 5,          // Distance en kilomètres (nombre)
  elevation: 80,        // Dénivelé positif en mètres (nombre)
  duration: '1h30',     // Durée estimée (texte libre)

  strollerLevel: 2,     // Niveau de carrossabilité : 1, 2 ou 3 (voir ci-dessous)

  tags: ['forêt', 'rivière', 'ombragé'],  // Mots-clés pour la recherche (tableau de strings)

  imageUrl: 'https://images.unsplash.com/photo-XXXXXXXX?w=800',  // URL d'une photo

  coordinates: {
    lat: 48.8566,   // Latitude  (ex: Paris = 48.8566)
    lng: 2.3522,    // Longitude (ex: Paris = 2.3522)
  },
},
```

---

## Étape 3 — Choisir le niveau de carrossabilité

| Valeur | Niveau          | Quand l'utiliser |
|--------|-----------------|------------------|
| `1`    | 🛺 Peu carrossable  | Sentier caillouteux, forte pente, terrain naturel non aménagé. Poussette tout-terrain indispensable. |
| `2`    | 🛺🛺 Carrossable     | Chemin en terre battue ou stabilisé. Praticable avec une poussette robuste. Quelques obstacles. |
| `3`    | 🛺🛺🛺 Très carrossable | Piste asphaltée, voie verte, promenade aménagée. Toutes les poussettes passent sans effort. |

---

## Étape 4 — Trouver les coordonnées GPS

1. Va sur [openstreetmap.org](https://www.openstreetmap.org)
2. Navigue jusqu'au point de départ de la balade
3. **Clic droit** → **"Afficher l'adresse"** (ou "Show address")
4. Les coordonnées `lat` et `lng` apparaissent dans l'URL ou dans le panneau latéral

Exemple d'URL OSM : `https://www.openstreetmap.org/#map=15/43.2965/5.3698`
→ `lat: 43.2965`, `lng: 5.3698`

---

## Étape 5 — Trouver une photo

### Option A — Unsplash (recommandé, gratuit)
1. Va sur [unsplash.com](https://unsplash.com)
2. Cherche un paysage similaire (ex: "forest trail", "lake france", "mountain path")
3. Clique sur une photo → bouton **"Download free"** → copie l'URL de la page
4. Ajoute `?w=800` à la fin de l'URL Unsplash pour optimiser le chargement

### Option B — Ta propre photo
Mets ta photo dans le dossier `public/images/` et utilise `/images/ma-photo.jpg` comme `imageUrl`.

---

## Étape 6 — Sauvegarder et déployer

1. **Sauvegarde** le fichier `data/trails.ts`
2. **Vérifie** qu'il n'y a pas d'erreur TypeScript :
   ```bash
   npm run build
   ```
3. **Déploie** sur Vercel :
   ```bash
   git add data/trails.ts
   git commit -m "Ajout balade : Nom de la balade"
   git push
   ```
   Vercel redéploie automatiquement.

> **Note :** Les avis et votes sont stockés en base de données (Supabase) et ne nécessitent aucune action de ta part.

---

## Exemple complet

```typescript
{
  id: 'promenade-bords-de-Loire-orleans',
  name: 'Promenade des bords de Loire',
  location: 'Orléans',
  region: 'Centre-Val de Loire',
  description:
    'Une belle balade le long de la Loire sur les quais entièrement aménagés. ' +
    'La surface asphaltée et la largeur du chemin en font un parcours idéal pour ' +
    'toutes les poussettes. Vue magnifique sur les ponts historiques d\'Orléans.',
  distance: 6,
  elevation: 10,
  duration: '1h30',
  strollerLevel: 3,
  tags: ['fleuve', 'asphalte', 'plat', 'urbain', 'patrimoine'],
  imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800',
  coordinates: {
    lat: 47.9029,
    lng: 1.9093,
  },
},
```
