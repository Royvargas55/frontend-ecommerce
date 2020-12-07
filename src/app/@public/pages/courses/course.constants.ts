export const COURSES_PAGES_INFO = {
    'platforms/Business': {
        title: 'Cursos de negocios',
        description: `En esta página encontraremos cursos de negocios.`,
        platformsIds: [79],
        topPrice: -1,
        stock: -1
    },
    'platforms/Creative': {
        title: 'Cursos creativos y crecimiento profesional',
        description: `En esta página encontraremos cursos relacionados con áreas creativas.`,
        platformsIds: [166, 112],
        topPrice: -1,
        stock: -1
    },
    'platforms/Technology': {
        title: 'Cursos de tecnología',
        description: `En esta página encontraremos cursos de diferentes tecnologías.`,
        platformsIds: [105],
        topPrice: -1,
        stock: -1
    },
    'promotions/last-units': {
        title: 'Últimas unidades',
        description: `En esta página encontraremos cursos que está a punto de agotarse`,
        platformsIds: [],
        topPrice: -1,
        stock: 30
    },
    'promotions/offers': {
        title: 'En liquidación',
        description: `En esta página encontraremos cursos con
        pocas existencias en el stock y a precios competitivos`,
        platformsIds: [],
        topPrice: 45,
        stock: 40
    },
};

export enum TYPE_OPERATION {
    PLATFORMS = 'platforms',
    PROMOTION = 'promotion'
}