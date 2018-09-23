import { Culture } from './Core';

export interface INumberFormat {
    decimalSeperator: string;
    thousandSeperator: string;
    identifier: Culture;
}

export interface ICurrencyFormat {
    name: string;
    symbol: () => string;
}

function getCurrencySymbol(currencyFormat: CurrencyFormatIdentifier) {
    return new Intl.NumberFormat('nl', { style: 'currency', currency: currencyFormat }).format(0)[0];
}

export const currencyFormats = {
    EUR: {
        name: 'Euro',
        symbol: () => getCurrencySymbol('EUR')
    },
    USD: {
        name: 'US Dollars',
        symbol: () => getCurrencySymbol('USD')
    }
};

export type CurrencyFormatIdentifier = keyof typeof currencyFormats;
export const defaultCurrencyFormat: CurrencyFormatIdentifier = 'EUR';

export const currencyFormat: CurrencyFormatIdentifier = defaultCurrencyFormat;

export const defaultNumberFormatKey: Culture = Culture.Dutch;
export const numberFormats: { [lang: string]: INumberFormat } = {
    'en-US': {
        decimalSeperator: ',',
        thousandSeperator: '.',
        identifier: Culture.USEnglish
    },
    'en-GB': {
        decimalSeperator: ',',
        thousandSeperator: '.',
        identifier: Culture.GBEnglish
    },
    nl: {
        decimalSeperator: '.',
        thousandSeperator: ',',
        identifier: Culture.Dutch
    }
};

let currentNumberFormat: INumberFormat,
    numberFormatters: { currency: Intl.NumberFormat; decimal: Intl.NumberFormat; percent: Intl.NumberFormat };

setNumberFormat(defaultNumberFormatKey);

export function setNumberFormat(culture: Culture) {
    const newNumberFormat = numberFormats[culture];

    if (!newNumberFormat) {
        throw new Error('Unknown culture: ' + culture);
    }

    currentNumberFormat = newNumberFormat;
    numberFormatters = {
        currency: new Intl.NumberFormat(culture, { style: 'decimal' }),
        decimal: new Intl.NumberFormat(culture, { style: 'currency', currency: currencyFormat }),
        percent: new Intl.NumberFormat(culture, { style: 'percent' })
    };
}

export function getNumberFormat() {
    return currentNumberFormat;
}

export enum NumberFormatType {
    Currency = 2,
    Decimal = 0,
    Percent = 1
}

function getNumberFormatter(type: NumberFormatType) {
    switch (type) {
        case NumberFormatType.Currency:
            return numberFormatters.currency;
        case NumberFormatType.Decimal:
            return numberFormatters.decimal;
        case NumberFormatType.Percent:
            return numberFormatters.percent;
        default:
            throw new Error('Unknown number format:' + type);
    }
}

function formatNumberCore(input: number, formatter: Intl.NumberFormat, numberOfDecimals?: number) {
    let currentFormatter = formatter;

    if (numberOfDecimals) {
        const formatterOptions = formatter.resolvedOptions();
        formatterOptions.maximumFractionDigits = numberOfDecimals;
        formatterOptions.minimumFractionDigits = numberOfDecimals;

        currentFormatter = new Intl.NumberFormat(currentNumberFormat.identifier, formatterOptions);
    }

    return currentFormatter.format(input);
}

export class Format {
    public static number(input: number, type: NumberFormatType, numberOfDecimals?: number) {
        return formatNumberCore(input, getNumberFormatter(type), numberOfDecimals);
    }

    public static currency(input: number) {
        return formatNumberCore(input, numberFormatters.currency);
    }

    public static percent(input: number, numberOfDecimals?: number) {
        return formatNumberCore(input, numberFormatters.percent, numberOfDecimals);
    }

    public static decimal(input: number, numberOfDecimals?: number) {
        return formatNumberCore(input, numberFormatters.decimal, numberOfDecimals);
    }
}

export class Parse {
    public static float(input: string): number {
        // While the JS standard library does have number formatting nowadays, it is still
        // lacking proper number parsing. This is not a problem, this just means we got to
        // transform the input into international number formatting

        if (!input) {
            return NaN;
        }

        const transformedInput = input
            .replace(currentNumberFormat.thousandSeperator, ' ')
            .replace(currentNumberFormat.decimalSeperator, '.')
            .replace('\u00A0', ' ')
            .replace('$', ' ')
            .replace('€', ' ')
            .replace(' ', '');

        return parseFloat(transformedInput);
    }
}
