export class Metric {
    id: number;
    name: string;
    description: string;
    type: number;
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
            type: dto.type,
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