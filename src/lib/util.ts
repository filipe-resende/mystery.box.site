export interface ConverterCurrencyOption {
  locale?: string
  style?: string
  currency?: string
}

export class Regex {
  public static regex = {
    cpf: /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}\/?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    telephone:
      /\(?\b([0-9]{2,3}|0((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{4,5}[- ]*[0-9]{4}\b/
  }

  public static cpf(cpf: string) {
    return this.regex.cpf.test(cpf)
  }
  public static email(email: string) {
    return this.regex.email.test(email)
  }
  public static phone(phone: string) {
    return this.regex.telephone.test(phone)
  }

  public static formatCPF = (value: string) =>
    value
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

  public static formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim()

  public static formatMonth = (value: string) =>
    value.replace(/\D/g, '').slice(0, 2)

  public static formatYear = (value: string) =>
    value.replace(/\D/g, '').slice(0, 4)

  public static formatCVC = (value: string) =>
    value.replace(/\D/g, '').slice(0, 3)
}

export class Mask {
  public static phone = value => {
    if (!value) return ''
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d)(\d{4})$/, '$1-$2')
    return value
  }
  public static cpf = value => {
    if (!value) return ''
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }
}

export class Util {
  public static compareStrings(str1: string, str2: string) {
    return str1 === str2
  }
  public static isEmpty(str1: string) {
    return !str1?.length
  }
  public static convertToCurrency(
    number: number,
    option?: ConverterCurrencyOption
  ): string {
    const defaultOptions: ConverterCurrencyOption = {
      locale: 'pt-BR',
      style: 'currency',
      currency: 'BRL'
    }

    const mergedOptions: ConverterCurrencyOption = {
      ...defaultOptions,
      ...option
    }

    return Number(number).toLocaleString(mergedOptions.locale, {
      style: mergedOptions.style,
      currency: mergedOptions.currency
    })
  }
}
