import { Trail } from '@/types'

export const trails: Trail[] = [
  {
    id: 'promenade-lac-annecy',
    name: 'Tour du lac d\'Annecy',
    location: 'Annecy',
    region: 'Auvergne-Rhône-Alpes',
    description:
      'Le tour du lac d\'Annecy est une balade emblématique sur une piste cyclable et piétonne entièrement asphaltée. Idéale pour les poussettes et poussettes sportives, ce parcours longe les rives du plus beau lac des Alpes avec des panoramas exceptionnels à chaque tournant.',
    distance: 22,
    elevation: 80,
    duration: '5h00',
    strollerLevel: 3,
    tags: ['lac', 'asphalte', 'panorama', 'cyclable'],
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    coordinates: { lat: 45.8992, lng: 6.1294 },
  },
  {
    id: 'foret-de-fontainebleau',
    name: 'Sentier des gorges de Fontainebleau',
    location: 'Fontainebleau',
    region: 'Île-de-France',
    description:
      'Un sentier balisé à travers la magnifique forêt de Fontainebleau. Le chemin emprunté est majoritairement sableux avec quelques passages rocheux. Convient aux poussettes tout-terrain, mais peut être difficile avec une poussette standard après la pluie.',
    distance: 8,
    elevation: 120,
    duration: '2h30',
    strollerLevel: 1,
    tags: ['forêt', 'sable', 'rochers', 'nature'],
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800',
    coordinates: { lat: 48.4049, lng: 2.7027 },
  },
  {
    id: 'voie-verte-alsace',
    name: 'Voie Verte d\'Alsace',
    location: 'Colmar',
    region: 'Grand Est',
    description:
      'Ancienne voie ferrée reconvertie en piste verte, cette route asphaltée traverse les vignobles alsaciens. Parfaitement plane avec une surface impeccable, idéale même pour les petites poussettes citadines. Villages pittoresques tout au long du parcours.',
    distance: 15,
    elevation: 30,
    duration: '3h30',
    strollerLevel: 3,
    tags: ['vignobles', 'asphalte', 'plat', 'villages'],
    imageUrl: 'https://images.unsplash.com/photo-1467226632440-65f0b4957563?w=800',
    coordinates: { lat: 48.0793, lng: 7.3585 },
  },
  {
    id: 'parc-des-buttes-chaumont',
    name: 'Boucle du Parc des Buttes-Chaumont',
    location: 'Paris 19e',
    region: 'Île-de-France',
    description:
      'Le plus sauvage des parcs parisiens offre une belle boucle sur chemins pavés et allées. Quelques montées mais le revêtement est excellent. Le tour du lac central avec vue sur le temple de la Sibylle est incontournable.',
    distance: 3,
    elevation: 50,
    duration: '1h00',
    strollerLevel: 2,
    tags: ['parc', 'lac', 'urbain', 'pavé'],
    imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800',
    coordinates: { lat: 48.8777, lng: 2.3823 },
  },
  {
    id: 'mont-saint-michel-digue',
    name: 'Digue du Mont-Saint-Michel',
    location: 'Mont-Saint-Michel',
    region: 'Normandie',
    description:
      'La route reliant le continent au Mont-Saint-Michel est entièrement praticable en poussette. La nouvelle passerelle piétonne offre des vues spectaculaires sur la baie. Attention aux horaires des marées pour profiter du spectacle.',
    distance: 4,
    elevation: 5,
    duration: '1h30',
    strollerLevel: 3,
    tags: ['patrimoine', 'mer', 'asphalte', 'maree'],
    imageUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
    coordinates: { lat: 48.6359, lng: -1.5114 },
  },
  {
    id: 'gorges-du-verdon',
    name: 'Sentier du Couloir Samson',
    location: 'Gorges du Verdon',
    region: "Provence-Alpes-Côte d'Azur",
    description:
      'Un sentier sauvage au cœur des gorges du Verdon. Le chemin est étroit, caillouteux et parfois escarpé. Réservé aux poussettes tout-terrain robustes avec un parent en bonne forme physique. Paysages époustouflants mais parcours exigeant.',
    distance: 6,
    elevation: 350,
    duration: '3h00',
    strollerLevel: 1,
    tags: ['gorges', 'cailloux', 'dénivelé', 'montagne'],
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    coordinates: { lat: 43.7372, lng: 6.3581 },
  },
  {
    id: 'promenade-des-anglais',
    name: 'Promenade des Anglais',
    location: 'Nice',
    region: "Provence-Alpes-Côte d'Azur",
    description:
      'L\'iconique promenade niçoise longeant la mer sur 7 km. Surface parfaitement asphaltée, large trottoir dédié aux piétons. Idéale en toutes saisons. Possibilité de s\'arrêter dans les nombreux cafés tout au long du parcours.',
    distance: 7,
    elevation: 5,
    duration: '1h45',
    strollerLevel: 3,
    tags: ['mer', 'asphalte', 'plat', 'urbain', 'mer-méditerranée'],
    imageUrl: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800',
    coordinates: { lat: 43.6955, lng: 7.2653 },
  },
  {
    id: 'canal-du-midi',
    name: 'Chemin de Halage du Canal du Midi',
    location: 'Toulouse',
    region: 'Occitanie',
    description:
      'Les berges ombragées du Canal du Midi offrent un chemin de halage en stabilisé compact. Le sol est généralement bon mais peut devenir boueux après la pluie. Les platanes centenaires créent un tunnel verdoyant magnifique.',
    distance: 12,
    elevation: 15,
    duration: '3h00',
    strollerLevel: 2,
    tags: ['canal', 'ombragé', 'plat', 'patrimoine-unesco'],
    imageUrl: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800',
    coordinates: { lat: 43.6047, lng: 1.4442 },
  },
  {
    id: 'vallee-de-la-vezere',
    name: 'Sentier des Falaises de la Vézère',
    location: 'Les Eyzies',
    region: 'Nouvelle-Aquitaine',
    description:
      'Un sentier entre falaises et rivière dans la vallée de la préhistoire. Le chemin en terre battue est praticable avec une poussette tout-terrain. Passages en sous-bois agréables. Sites préhistoriques visibles depuis le sentier.',
    distance: 5,
    elevation: 80,
    duration: '1h45',
    strollerLevel: 2,
    tags: ['rivière', 'falaises', 'préhistoire', 'sous-bois'],
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    coordinates: { lat: 44.9365, lng: 1.0147 },
  },
  {
    id: 'balade-marais-poitevin',
    name: 'Balade en barque du Marais Poitevin',
    location: 'Coulon',
    region: 'Nouvelle-Aquitaine',
    description:
      'Le chemin de halage du Marais Poitevin longe les canaux dans la Venise Verte. Surface en herbe tondue et stabilisé, praticable en poussette tout-terrain. La végétation luxuriante et les reflets sur l\'eau créent une atmosphère féerique.',
    distance: 4,
    elevation: 5,
    duration: '1h15',
    strollerLevel: 2,
    tags: ['marais', 'canaux', 'herbe', 'nature-préservée'],
    imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800',
    coordinates: { lat: 46.3174, lng: -0.5789 },
  },
]

export function getTrailById(id: string): Trail | undefined {
  return trails.find((t) => t.id === id)
}

export function getTrailsByLevel(level: number): Trail[] {
  return trails.filter((t) => t.strollerLevel === level)
}
