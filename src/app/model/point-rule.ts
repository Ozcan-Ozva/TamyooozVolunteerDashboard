import { MetricQuery } from "./metric-query";

export class PointRule {
    id?:               number;
    rule_name?:        string;
    description?:      string;
    points?:           number;
    metrics_query_id?: number;
    created_at?:       Date;
    metric_query?:     MetricQuery;

    constructor(pointRule: Partial<PointRule>) {
        if (!pointRule) pointRule = {};
        this.id = pointRule.id;
        this.rule_name = pointRule.rule_name;
        this.description = pointRule.description;
        this.points = pointRule.points;
        this.metrics_query_id = pointRule.metrics_query_id;
        this.created_at = pointRule.created_at;
        this.metric_query = MetricQuery.fromDTO(pointRule.metric_query);
    }

    public static fromDTO(dto : any) : PointRule | null {
        return dto == null ? null : 
        new PointRule({
            id: dto.id,
            rule_name : dto.rule_name,
            description: dto.description,
            points: dto.points,
            metrics_query_id: dto.metrics_query_id,
            created_at: dto.created_at,
            metric_query: dto.metric_query == null ? {} : MetricQuery.fromDTO(dto.metric_query),
        });
    }

    public static fromDTOArray(dtoArray : any) : PointRule[] {
        return dtoArray.map((dto) => PointRule.fromDTO(dto));
    }
    public static fromArray(pointsRule: Partial<PointRule>[]): PointRule[] {
        return pointsRule.map((pointRule) => new PointRule(pointRule));
    }
}