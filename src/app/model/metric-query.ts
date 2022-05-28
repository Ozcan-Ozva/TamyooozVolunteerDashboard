export class MetricQuery {
    id?:                number;
    first_operation?:   string;
    second_operation?:  string;
    compare_operation?: string;
    compare_value?:     number;
    metric_id?:         number;
    created_at?:        Date;

    constructor(metricQuery: Partial<MetricQuery>) {
        if (!metricQuery) metricQuery = {};
        this.id = metricQuery.id;
        this.first_operation = metricQuery.first_operation;
        this.second_operation = metricQuery.second_operation;
        this.compare_operation = metricQuery.compare_operation;
        this.compare_value = metricQuery.compare_value;
        this.metric_id = metricQuery.metric_id;
        this.created_at = metricQuery.created_at;
    }

    public static fromDTO(dto : any) : MetricQuery | null {
        return dto == null ? null : 
        new MetricQuery({
            id: dto.id,
            first_operation : dto.first_operation,
            second_operation : dto.second_operation,
            compare_operation : dto.compare_operation,
            compare_value : dto.compare_value,
            metric_id : dto.metric_id,
            created_at : dto.created_at,
        });
    }

    public static fromDTOArray(dtoArray : any) : MetricQuery[] {
        return dtoArray.map((dto) => MetricQuery.fromDTO(dto));
    }
    public static fromArray(metricsQuery: Partial<MetricQuery>[]): MetricQuery[] {
        return metricsQuery.map((metricQuery) => new MetricQuery(metricQuery));
    }
}