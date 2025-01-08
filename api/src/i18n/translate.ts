import { I18nContext, I18nService } from 'nestjs-i18n'

export class Translate {
    protected constructor(public i18n: I18nService) {}

    get lang() {
        return I18nContext.current()?.lang ?? 'en'
    }

    protected t(key = '', args = {}): string {
        return this.i18n.t(key, { args, lang: this.lang })
    }
}
