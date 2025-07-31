export const modes = {
    default: 'Стандартный',
    hard: 'Подряд',
    superhard: 'Особый',
} as const;

export type mode = keyof typeof modes;