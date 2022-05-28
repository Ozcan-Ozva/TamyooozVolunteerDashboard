import { MetricQuery } from "./metric-query";

export class Badge {
    id:              number;
    name:            string;
    description:     string;
    created_at:      Date;
    isTaken:         number;
    media:           any[];
    badge_condition: BadgeCondition[];

    constructor(badge: Partial<Badge>) {
        if (!badge) badge = {};
        this.id = badge.id;
        this.name = badge.name;
        this.description = badge.description;
        this.created_at = badge.created_at;
        this.isTaken = badge.isTaken;
        this.media = badge.media;
        this.badge_condition = BadgeCondition.fromArray(badge.badge_condition);
    }

    public static fromDTO(dto : any) : Badge | null {
        return dto == null ? null : 
        new Badge({
            id: dto.id,
            name : dto.name,
            description : dto.description,
            created_at : dto.created_at,
            isTaken : dto.isTaken,
            media : dto.media,
            badge_condition: BadgeCondition.fromDTOArray(dto.badge_condition),
        });
    }

    public static fromDTOArray(dtoArray : any) : Badge[] {
        return dtoArray.map((dto) => Badge.fromDTO(dto));
    }
    public static fromArray(badges: Partial<Badge>[]): Badge[] {
        return badges.map((badge) => new Badge(badge));
    }
}


export class BadgeCondition {
    id:               number;
    badge_id:         number;
    metrics_query_id: number;
    created_at:       Date;
    metric_query:     MetricQuery;

    constructor(badgeCondition: Partial<BadgeCondition>) {
        if (!badgeCondition) badgeCondition = {};
        this.id = badgeCondition.id;
        this.badge_id = badgeCondition.badge_id;
        this.metrics_query_id = badgeCondition.metrics_query_id;
        this.created_at = badgeCondition.created_at;
        this.metric_query = MetricQuery.fromDTO(badgeCondition.metric_query);
    }

    public static fromDTO(dto : any) : BadgeCondition | null {
        return dto == null ? null : 
        new BadgeCondition({
            id: dto.id,
            badge_id : dto.badge_id,
            metrics_query_id : dto.metrics_query_id,
            created_at : dto.created_at,
            metric_query: MetricQuery.fromDTO(dto.metric_query),
        });
    }

    public static fromDTOArray(dtoArray : any) : BadgeCondition[] {
        return dtoArray.map((dto) => BadgeCondition.fromDTO(dto));
    }
    public static fromArray(badgeConditions: Partial<BadgeCondition>[]): BadgeCondition[] {
        return badgeConditions.map((badgeCondition) => new BadgeCondition(badgeCondition));
    }
}