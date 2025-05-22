type Options = {
    label: string;
    value: string;
};

export const kriteriaTypes: Options[] = [
    { label: 'Benefit', value: 'benefit' },
    { label: 'Cost', value: 'cost' },
];

export const nilaiSubKriteria: Options[] = [
    { label: '(1.0) - Sangat Baik', value: '1' },
    { label: '(0.8) - Baik', value: '0.8' },
    { label: '(0.6) - Cukup', value: '0.6' },
    { label: '(0.4) - Kurang', value: '0.4' },
    { label: '(0.2) - Buruk', value: '0.2' },
];

export const ahpOptions: Options[] = [
    { label: '1 - Sama Penting', value: '1' },
    { label: '2', value: '2' },
    { label: '3 - Cukup Penting', value: '3' },
    { label: '4', value: '4' },
    { label: '5 - Penting', value: '5' },
    { label: '6', value: '6' },
    { label: '7 - Sangat Penting', value: '7' },
    { label: '8', value: '8' },
    { label: '9 - Mutlak Lebih Penting', value: '9' },
];
