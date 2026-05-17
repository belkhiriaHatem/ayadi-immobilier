export const projects = [
  {
    slug: "the-hills",
    title: "The Hills",
    subtitle: "Résidence S+2 & S+3 à Hammam Sousse",
    location: "Hammam Sousse",

    summary:
      "Résidence The Hills – S+2 & S+3 à Hammam Sousse, dans un quartier résidentiel calme entouré de villas en R+2.",

    description:
      "The Hills est une résidence haut standing pensée comme une pièce de haute couture immobilière. Nichée à Hammam Sousse dans un environnement résidentiel calme et élégant, elle combine architecture contemporaine, finitions premium et confort absolu. Chaque appartement S+2 et S+3 a été conçu pour offrir lumière, espace et raffinement, dans une vision moderne du luxe accessible.",

    architect: "Firas Ayadi / @firas.ayadi.architects",

    highlights: [
      "Résidence S+2 & S+3",
      "Quartier résidentiel calme",
      "Environnement villas R+2",
      "Architecture contemporaine",
      "Finitions haut de gamme",
      "Appartements haut standing", "Ascenseur", "Parking", "Sécurité", "Espaces verts",
    ],

    details: [
      { label: "Type", value: "S+2 & S+3 de luxe" },
      { label: "Emplacement", value: "Hammam Sousse, Tunisie" },
      { label: "Style", value: "Architecture contemporaine haut de gamme" },
      { label: "Concept", value: "La haute couture de l’immobilier" },
      { label: "Offre", value: "Investissement et style de vie premium" },
    ],

    whatsappMessage:
      "Bonjour, je souhaite recevoir plus d’informations sur la résidence The Hills (S+2 & S+3) à Hammam Sousse et organiser une visite.",

    videoSrc: "/thehills.mp4",
    image: "/images/project-1.jpg",
  }
] as const;

export type Project = (typeof projects)[number];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
