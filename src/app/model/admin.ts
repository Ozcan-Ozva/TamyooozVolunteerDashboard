import { Level } from "./level";
import { Personality } from "./personality";

export class Admin {
    id: number;
    name: string;
    email: string;
    roles : number[];
    created_at: Date;
    /* level?: Level;
    personality?: Personality[];
    total_points? : number;
    traits_values?: number[]; */

    constructor(admin: Partial<Admin>) {
        if (!admin) admin = {};
        this.id = admin.id;
        this.name = admin.name;
        this.email = admin.email;
        this.roles = admin.roles;
        this.created_at = new Date(admin.created_at);
        /* this.level = new Level(admin.level);
        this.personality = Personality.fromArray(admin.personality);
        this.total_points = admin.total_points;
        this.traits_values = admin.traits_values; */
    }

    public static fromDTO(dto : any) : Admin | null {
        return dto == null ? null : 
        new Admin({
            id: dto.id,
            name : dto.name,
            email : dto.email,
            roles: dto.roles,
            created_at : dto.created_at,
            /* level : Level.fromDTO(dto.level),
            personality : Personality.fromDTOArray(dto.personality),
            total_points: dto.total_points,
            traits_values: dto.traits_values, */
        });
    }
    public static fromDTOArray(dtoArray : any) : Admin[] {
        return dtoArray.map((dto) => Admin.fromDTO(dto));
    }
    public static fromArray(admins: Partial<Admin>[]): Admin[] {
        return admins.map((admin) => new Admin(admin));
    }
}