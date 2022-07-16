export class Level {
    id: number;
    level: number;
    level_name: string;
    min_points: number;
    start_points: number;
    created_at? : Date;
    updated_at? : Date;

    constructor(level: Partial<Level>) {
        if (!level) level = {};
        this.id = level.id;
        this.level = level.level;
        this.level_name = level.level_name;
        this.min_points = level.min_points;
        this.start_points = level.start_points;
        this.created_at = level.created_at;
        this.updated_at = level.updated_at;
    }

    public static fromDTO(dto : any) : Level | null {
        return dto == null ? null : 
        new Level({
            id: dto.id,
            level: dto.level,
            level_name : dto.level_name,
            min_points : dto.min_points,
            start_points : dto.start_points,
            created_at: dto.created_at,
            updated_at: dto.updated_at
        });
    }

    public static fromDTOArray(dtoArray : any) : Level[] {
        return dtoArray.map((dto) => Level.fromDTO(dto));
    }
    public static fromArray(levels: Partial<Level>[]): Level[] {
        return levels.map((level) => new Level(level));
    }
}