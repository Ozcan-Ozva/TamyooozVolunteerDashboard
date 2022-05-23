export namespace TypesUtils {
    export enum Gender {
        Male = 'MALE',
        Female = 'FEMALE',
    }

    export type PropertiesKeys<T> = {
        [P in keyof T]: T[P] extends Function ? never : P;
    }[keyof T];
    export type Properties<T> = Pick<T, PropertiesKeys<T>>;

    export type PrimitivePropertiesKeys<T> = {
        [P in keyof T]: T[P] extends string | boolean | number | Date ? P : never;
    }[keyof T];

    export type PrimitiveProperties<T> = Pick<T, PrimitivePropertiesKeys<T>>;
}
