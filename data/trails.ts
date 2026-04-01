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
  imageUrl: 'https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=800',
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
  imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
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
  imageUrl: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800',
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
  strollerLevel: 3,
  tags: ['parc', 'asphalte', 'ombragé', 'urbain', 'jardin botanique', 'aire de jeux'],
  imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
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
  imageUrl: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800',
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
  imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
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
  imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
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
  imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800',
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
  imageUrl: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800',
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
  imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
  coordinates: {
    lat: 43.6397,
    lng: 5.0975,
  },
},
]

export function getTrailById(id: string): Trail | undefined {
  return trails.find((t) => t.id === id)
}

export function getTrailsByLevel(level: number): Trail[] {
  return trails.filter((t) => t.strollerLevel === level)
}
