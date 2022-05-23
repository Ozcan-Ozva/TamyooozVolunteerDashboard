export namespace DateUtils {
    export function formateWithLabels(
        date: Date,
        local: string,
        locals: DateFormatLocals,
        config: { locals?: string | string[]; options?: Intl.DateTimeFormatOptions } = {}
    ): string {
        let { isToday, isYesterday, isTomorrow } = when(date);
        if (isToday) {
            if (!config.options) config.options = { hour: 'numeric', minute: 'numeric' };
            let statement = locals[local].today;
            let dateString = date.toLocaleDateString(config.locals, config.options);
            return `${statement} ${dateString}`;
        } else if (isYesterday) {
            if (!config.options) config.options = { hour: 'numeric', minute: 'numeric' };
            let statement = locals[local].yesterday;
            let dateString = date.toLocaleDateString(config.locals, config.options);
            return `${statement} ${dateString}`;
        } else if (isTomorrow) {
            if (!config.options) config.options = { hour: 'numeric', minute: 'numeric' };
            let statement = locals[local].tomorrow;
            let dateString = date.toLocaleDateString(config.locals, config.options);
            return `${statement} ${dateString}`;
        } else return date.toLocaleDateString(config.locals, config.options);
    }

    function when(date: Date): { isToday: boolean; isTomorrow: boolean; isYesterday: boolean } {
        let now = new Date();
        let today = now.getDate();
        let month = now.getMonth();
        let year = now.getFullYear();
        let date_day = date.getDate();
        if (date.getFullYear() != year || date.getMonth() != month)
            return { isToday: false, isTomorrow: false, isYesterday: false };
        else if (date_day === today) return { isToday: true, isTomorrow: false, isYesterday: false };
        else if (date_day === today + 1) return { isToday: false, isTomorrow: true, isYesterday: false };
        else if (date_day === today - 1) return { isToday: false, isTomorrow: false, isYesterday: true };
    }

    export type DateFormatLocals = {
        [lang: string]: {
            yesterday: string;
            today: string;
            tomorrow: string;
        };
    };
}
