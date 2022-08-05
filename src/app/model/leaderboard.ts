import { MetricQuery } from "./metric-query";
import { User } from "./user";

export class Leaderboard {
    id: number;
    name: string;
    description: string;
    table_size: number;
    metrics_query_id: number;
    created_at : Date;
    updated_at: Date;
    volunteers: VolunteerValue[] = [];
    metric_query: MetricQuery;


    constructor(leaderboard: Partial<Leaderboard>) {
        if (!leaderboard) leaderboard = {};
        this.id = leaderboard.id;
        this.name = leaderboard.name;
        this.description = leaderboard.description;
        this.table_size = leaderboard.table_size;
        this.metrics_query_id = leaderboard.metrics_query_id;
        this.created_at = leaderboard.created_at;
        this.updated_at = leaderboard.updated_at;
        this.volunteers = VolunteerValue.fromArray(leaderboard.volunteers);
        this.metric_query = new MetricQuery(leaderboard.metric_query);
    }

    public static fromDTO(dto : any) : Leaderboard | null {
        return dto == null ? null : 
        new Leaderboard({
            id: dto.id,
            name : dto.name,
            description : dto.description,
            table_size : dto.table_size,
            metrics_query_id: dto.metrics_query_id,
            created_at: dto.created_at,
            updated_at: dto.updated_at,
            volunteers: VolunteerValue.fromDTOArray(dto.volunteers),
            metric_query: MetricQuery.fromDTO(dto.metric_query),
        });
    }

    public static fromDTOArray(dtoArray : any) : Leaderboard[] {
        return dtoArray.map((dto) => Leaderboard.fromDTO(dto));
    }
    public static fromArray(leaderboards: Partial<Leaderboard>[]): Leaderboard[] {
        return leaderboards.map((leaderboard) => new Leaderboard(leaderboard));
    }
}

export class VolunteerValue {
    value: number;
    user: User;
    key: number;

    constructor(volunteerValue: Partial<VolunteerValue>) {
        if (!volunteerValue) volunteerValue = {};
        this.value = volunteerValue.value;
        this.user = new User(volunteerValue.user)
        this.key = volunteerValue.key;
    }

    public static fromDTO(dto : any) : VolunteerValue | null {
        return dto == null ? null : 
        new VolunteerValue({
            value: dto.value,
            user : User.fromDTO(dto.user),
            key: dto.key,
        });
    }

    public static fromDTOArray(dtoArray : any) : VolunteerValue[] {
        return dtoArray.map((dto) => VolunteerValue.fromDTO(dto));
    }
    public static fromArray(volunteerValues: Partial<VolunteerValue>[]): VolunteerValue[] {
        return volunteerValues.map((volunteerValue) => new VolunteerValue(volunteerValue));
    }
}
