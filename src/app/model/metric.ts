export enum METRIC_TYPES {
    BOOLEAN = 1,
    LIST_BOOLEAN = 2,
    STRING = 3,
    LIST_STRING = 4,
    NUMBER = 5,
    LIST_NUMBER = 6,
}

export class Metric {
    id: number;
    name: string;
    description: string;
    type: METRIC_TYPES;
    created_at: Date

    constructor(metric: Partial<Metric>) {
        if (!metric) metric = {};
        this.id = metric.id;
        this.name = metric.name;
        this.description = metric.description;
        this.type = metric.type;
        this.created_at = new Date(metric.created_at);
    }

    public static fromDTO(dto : any) : Metric | null {
        return dto == null ? null : 
        new Metric({
            id: dto.id,
            name: dto.name,
            description: dto.description,
            type: dto.type == 1 ? METRIC_TYPES.BOOLEAN
            : dto.type == 2 ? METRIC_TYPES.LIST_BOOLEAN
            : dto.type == 3 ? METRIC_TYPES.STRING
            : dto.type == 4 ? METRIC_TYPES.LIST_STRING
            : dto.type == 5 ? METRIC_TYPES.NUMBER
            : dto.type == 6 ? METRIC_TYPES.LIST_NUMBER
            : METRIC_TYPES.BOOLEAN,
            created_at: dto.created_at,
        });
    }

    public static fromDTOArray(dtoArray : any) : Metric[] {
        return dtoArray.map((dto) => Metric.fromDTO(dto));
    }
    public static fromArray(metrix: Partial<Metric>[]): Metric[] {
        return metrix.map((metric) => new Metric(metric));
    }
}