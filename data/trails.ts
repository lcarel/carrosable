import { Trail } from '@/types'

export const trails: Trail[] = [
{
  id: 'parc-borely-marseille',
  name: 'Parc Borély',
  location: 'Marseille',
  region: 'Bouches-du-Rhône',
  description:
    'Le parc Borély est un vaste parc paysager de Marseille avec de larges allées asphaltées ' +
    'idéales pour toutes les poussettes. Autour du lac central, on profite de pelouses ombragées, ' +
    'd\'aires de jeux et d\'une buvette. Un incontournable pour les familles marseillaises.',
  distance: 3,
  elevation: 10,
  duration: '1h00',
  strollerLevel: 3,
  tags: ['parc', 'asphalte', 'plat', 'urbain', 'lac', 'aire de jeux', 'ombragé'],
  coordinates: {
    lat: 43.2601,
    lng: 5.3797,
  },
},

{
  id: 'corniche-kennedy-marseille',
  name: 'Corniche Kennedy',
  location: 'Marseille',
  region: 'Bouches-du-Rhône',
  description:
    'La célèbre corniche de Marseille longe la mer sur plusieurs kilomètres avec une promenade ' +
    'asphaltée et des vues spectaculaires sur la Méditerranée. Nombreuses plages accessibles ' +
    'le long du parcours. Idéal en début de matinée pour éviter l\'affluence.',
  distance: 5,
  elevation: 20,
  duration: '1h30',
  strollerLevel: 3,
  tags: ['mer', 'asphalte', 'plat', 'urbain', 'vue mer', 'plages'],
  coordinates: {
    lat: 43.2750,
    lng: 5.3530,
  },
},

{
  id: 'fort-saint-jean-mucem-marseille',
  name: 'Fort Saint-Jean & MuCEM',
  location: 'Marseille',
  region: 'Bouches-du-Rhône',
  description:
    'Une balade urbaine et culturelle sur les passerelles et jardins du Fort Saint-Jean, ' +
    'entièrement accessible aux poussettes. Vue imprenable sur le MuCEM, la cathédrale de la Major ' +
    'et le Vieux-Port. Entrée gratuite pour le fort et les jardins.',
  distance: 2,
  elevation: 15,
  duration: '0h45',
  strollerLevel: 3,
  tags: ['urbain', 'patrimoine', 'asphalte', 'vue mer', 'gratuit', 'culturel'],
  coordinates: {
    lat: 43.2964,
    lng: 5.3613,
  },
},

{
  id: 'parc-longchamp-marseille',
  name: 'Parc Longchamp',
  location: 'Marseille',
  region: 'Bouches-du-Rhône',
  description:
    'Promenade autour de la majestueuse fontaine de Longchamp, construite pour célébrer l\'arrivée ' +
    'de l\'eau à Marseille. Allées larges et ombragées, jardin botanique, musées et aire de jeux. ' +
    'Un poumon vert en plein cœur de la ville, parfait pour une sortie tranquille.',
  distance: 2,
  elevation: 10,
  duration: '0h45',
  strollerLevel: 2,
  tags: ['parc', 'asphalte', 'ombragé', 'urbain', 'jardin botanique', 'aire de jeux'],
  coordinates: {
    lat: 43.3037,
    lng: 5.3964,
  },
},

{
  id: 'marais-du-vigueirat-camargue',
  name: 'Sentier des Marais du Vigueirat',
  location: 'Arles',
  region: 'Bouches-du-Rhône',
  description:
    'Le sentier de la Palunette traverse les marais camarguais sur un chemin plat et stabilisé, ' +
    'avec des abris d\'observation de la faune tout au long du parcours. Flamants roses, hérons et ' +
    'chevaux camarguais sont au rendez-vous. Dénivelé nul, idéal avec une poussette tout-terrain.',
  distance: 2,
  elevation: 0,
  duration: '1h00',
  strollerLevel: 2,
  tags: ['nature', 'marais', 'faune', 'Camargue', 'plat', 'oiseaux', 'observation'],
  coordinates: {
    lat: 43.5270,
    lng: 4.7080,
  },
},

{
  id: 'grand-parc-figuerolles-martigues',
  name: 'Grand Parc de Figuerolles',
  location: 'Martigues',
  region: 'Bouches-du-Rhône',
  description:
    'Vaste parc de 130 hectares longeant les rives de l\'Étang de Berre, avec un sentier nature, ' +
    'une ferme pédagogique et un sentier botanique. Chemins larges et bien entretenus, accessibles ' +
    'aux poussettes robustes. Un cadre méditerranéen verdoyant à deux pas de Martigues.',
  distance: 4,
  elevation: 30,
  duration: '1h15',
  strollerLevel: 2,
  tags: ['nature', 'étang', 'ferme pédagogique', 'botanique', 'méditerranéen', 'famille'],
  coordinates: {
    lat: 43.4080,
    lng: 5.0520,
  },
},

{
  id: 'barrages-bimont-zola-aix',
  name: 'Barrages de Bimont et Zola',
  location: 'Aix-en-Provence',
  region: 'Bouches-du-Rhône',
  description:
    'Belle balade forestière au pied de la Sainte-Victoire reliant les deux barrages historiques : ' +
    'le barrage de Bimont et le lac de Zola, conçu par le père de l\'écrivain Émile Zola. ' +
    'Chemin ombragé en forêt de pins, idéal avec une poussette tout-terrain.',
  distance: 5,
  elevation: 60,
  duration: '1h30',
  strollerLevel: 2,
  tags: ['forêt', 'lac', 'patrimoine', 'ombragé', 'Sainte-Victoire', 'pins'],
  coordinates: {
    lat: 43.5340,
    lng: 5.5610,
  },
},

{
  id: 'parc-poudrerie-saint-chamas',
  name: 'Parc de la Poudrerie Royale',
  location: 'Saint-Chamas',
  region: 'Bouches-du-Rhône',
  description:
    'Ancienne Poudrerie royale reconvertie en parc naturel de 118 hectares, avec plusieurs ' +
    'itinéraires balisés sur des allées larges et planes. Un cadre verdoyant et insolite, mélange ' +
    'd\'histoire industrielle et de nature reconquise. Très accessible pour les poussettes.',
  distance: 4,
  elevation: 15,
  duration: '1h15',
  strollerLevel: 3,
  tags: ['parc', 'nature', 'histoire', 'allées larges', 'plat', 'insolite'],
  coordinates: {
    lat: 43.5490,
    lng: 5.0330,
  },
},

{
  id: 'arles-centre-historique',
  name: 'Arles — Balade dans la cité romaine',
  location: 'Arles',
  region: 'Bouches-du-Rhône',
  description:
    'Arles est une ville entièrement plate, idéale à explorer en poussette. Le circuit du ' +
    'centre historique passe par les Arènes, les Alyscamps, le théâtre antique et les bords ' +
    'du Rhône. Ruelles pavées en partie, prévoir une poussette robuste pour les passages en galets.',
  distance: 4,
  elevation: 5,
  duration: '1h30',
  strollerLevel: 2,
  tags: ['urbain', 'patrimoine', 'romain', 'plat', 'fleuve', 'culturel', 'histoire'],
  coordinates: {
    lat: 43.6767,
    lng: 4.6278,
  },
},

{
  id: 'salon-de-provence-centre',
  name: 'Salon-de-Provence — Vieille ville',
  location: 'Salon-de-Provence',
  region: 'Bouches-du-Rhône',
  description:
    'Découverte du centre historique de Salon-de-Provence avec ses places ombragées, ses fontaines, ' +
    'la Tour de l\'Horloge et la tombe de Nostradamus. Les rues principales sont larges et ' +
    'accessibles, avec quelques ruelles pavées. Douceur de vivre provençale garantie.',
  distance: 3,
  elevation: 20,
  duration: '1h00',
  strollerLevel: 2,
  tags: ['urbain', 'patrimoine', 'provençal', 'fontaines', 'histoire', 'Nostradamus'],
  coordinates: {
    lat: 43.6397,
    lng: 5.0975,
  },
},


{
  id: 'balade-bolmon-marignane-parentcool',
  name: "Balade des familles — Étang du Bolmon",
  location: 'Marignane',
  region: 'Bouches-du-Rhône',
  description:
    "Promenade aménagée au bord de l'étang du Bolmon, pensée pour les familles. " +
    'Sentier balisé avec panneaux pédagogiques sur la faune et la flore locales, ' +
    'et un observatoire ornithologique. Accessible en poussette, gratuit toute l\'année. ' +
    "Départ depuis l'avenue Edmond Rostand, parking à proximité.",
  distance: 3,
  elevation: 0,
  duration: '1h00',
  strollerLevel: 3,
  tags: ['étang', 'nature', 'oiseaux', 'pédagogique', 'plat', 'gratuit', 'accessible PMR'],
  imageUrl: 'https://parentcool.fr/cool_medias/2026/02/balade-familles-bolmon-marignane-nature.jpg',
  coordinates: {
    lat: 43.4180,
    lng: 5.2150,
  },
},

// ============================================================
// 3. Sentier Paluns–Patafloux–Barlatier — Marignane
// Source : https://parentcool.fr/annuaire/sentier-paluns-patafloux-barlatier-marignane/
// Tags parentcool : (pas de tag poussette — poussette tout-terrain conseillée)
// ============================================================
{
  id: 'sentier-paluns-patafloux-marignane-parentcool',
  name: 'Sentier Paluns – Patafloux – Barlatier',
  location: 'Marignane',
  region: 'Bouches-du-Rhône',
  description:
    "Balade nature gratuite au cœur d'une zone humide préservée entre canaux, pinède et espaces ouverts. " +
    'Le sentier relie plusieurs observatoires ornithologiques pour observer oiseaux et biodiversité locale. ' +
    'Accessible en poussette tout-terrain sur certaines portions. ' +
    'Départ depuis le parking du chemin des Macreuses, secteur Patafloux.',
  distance: 4,
  elevation: 10,
  duration: '1h30',
  strollerLevel: 2,
  tags: ['zone humide', 'oiseaux', 'pinède', 'observatoire', 'nature', 'gratuit', 'pédagogique'],
  imageUrl: 'https://parentcool.fr/cool_medias/2026/02/Sentier-Paluns-parent-cool.jpg',
  coordinates: {
    lat: 43.4050,
    lng: 5.2050,
  },
},

// ============================================================
// 4. Domaine de Valabre — Gardanne
// Source : https://parentcool.fr/annuaire/domaine-valabre-gardanne/
// Tags parentcool : (poussette possible sur certains axes)
// ============================================================
{
  id: 'domaine-valabre-gardanne-parentcool',
  name: 'Domaine de Valabre',
  location: 'Gardanne',
  region: 'Bouches-du-Rhône',
  description:
    'Vaste domaine de 150 hectares de forêts et de collines méditerranéennes entre ' +
    'Aix-en-Provence et Marseille. Accueille l\'Écomusée de la forêt méditerranéenne ' +
    'et des sentiers accessibles en poussette sur certains axes. ' +
    "Idéal pour une sortie nature pédagogique en famille. " +
    'Départ : Chemin du Moulin du Fort, Gardanne.',
  distance: 4,
  elevation: 50,
  duration: '1h15',
  strollerLevel: 2,
  tags: ['forêt méditerranéenne', 'nature', 'écomusée', 'pédagogique', 'collines', 'gratuit'],
  imageUrl: 'https://parentcool.fr/cool_medias/2026/02/Domaine-de-Valabre-parent-cool.jpg',
  coordinates: {
    lat: 43.4670,
    lng: 5.4720,
  },
},

// ============================================================
// 5. Parc du Bocage — Plan-de-Cuques
// Source : https://parentcool.fr/annuaire/parc-bocage-plan-de-cuques/
// Tags parentcool : Accessible poussette · Accès PMR
// ============================================================
{
  id: 'parc-bocage-plan-de-cuques-parentcool',
  name: 'Parc du Bocage',
  location: 'Plan-de-Cuques',
  region: 'Bouches-du-Rhône',
  description:
    'Parc municipal apprécié des familles avec de vastes espaces verts, des zones d\'activités ' +
    'et des coins calmes pour se détendre ou pique-niquer. ' +
    'Chemins relativement praticables en poussette. Parking à proximité. ' +
    'Accès libre toute l\'année. Vigilance conseillée à proximité du bord de rivière.',
  distance: 2,
  elevation: 10,
  duration: '0h45',
  strollerLevel: 2,
  tags: ['parc', 'nature', 'pique-nique', 'rivière', 'famille', 'gratuit', 'accessible PMR'],
  imageUrl: 'https://parentcool.fr/cool_medias/2026/02/parc-du-bocage-parent-cool.jpg',
  coordinates: {
    lat: 43.3490,
    lng: 5.4470,
  },
},

// ============================================================
// 6. Parc de la Montade — Plan-de-Cuques
// Source : https://parentcool.fr/annuaire/parc-montade-plan-de-cuques/
// Tags parentcool : Accessible poussette · Aire de jeux
// ============================================================
{
  id: 'parc-montade-plan-de-cuques-parentcool',
  name: 'Parc de la Montade',
  location: 'Plan-de-Cuques',
  region: 'Bouches-du-Rhône',
  description:
    'Parc verdoyant sur les hauteurs de Plan-de-Cuques avec des chemins tranquilles, ' +
    'un environnement arboré et des vues dégagées sur les environs. ' +
    'Adapté aux enfants dès 3 ans. Chemins parfois irréguliers, préférer une poussette robuste. ' +
    'Accès libre et gratuit toute l\'année. Adresse : 4 Rue André Bailet.',
  distance: 2,
  elevation: 30,
  duration: '0h45',
  strollerLevel: 2,
  tags: ['parc', 'nature', 'arboré', 'vue', 'calme', 'gratuit', 'hauteurs'],
  imageUrl: 'https://parentcool.fr/cool_medias/2026/02/inauguration_parc_de_la_montade_42.jpg',
  coordinates: {
    lat: 43.3530,
    lng: 5.4490,
  },
},

]

export function getTrailById(id: string): Trail | undefined {
  return trails.find((t) => t.id === id)
}

export function getTrailsByLevel(level: number): Trail[] {
  return trails.filter((t) => t.strollerLevel === level)
}
