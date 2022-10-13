import { Plan } from "../../models/interfaces/plans";

export const PlansConstant: Plan[] = [
  {
    id: '1',
    title: "Móvil",
    price: "13.900,00",
    benefits: [
      "Disfruta solo en Smartphones y Tabletas",
      "Ve en 1 dispositivo a la vez",
      "Contenido en definición estándar",
      "Descarga y disfruta tus títulos preferidos donde sea",
    ],
  },
  {
    id: '2',
    title: "Estándar",
    price: "19.900,00",
    benefits: [
      "Disfruta en todas tus pantallas",
      "Chromecast y Airplay disponibles",
      "Ve en 3 dispositivos a la vez",
      "Contenido en alta definición y 4K",
      "Descarga y disfruta tus títulos preferidos donde sea",
      "Configura hasta 5 perfiles para toda la familia",
    ],
  },
];
