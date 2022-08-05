import { Level } from "./level";
import { Personality } from "./personality";
import { Role } from "./role";
import { TraitsValues } from "./traitsValues";

export class User {
    id: number;
    name: string;
    email?: string;
    username?: string;
    date_of_birth?: Date;
    phone?: string;
    gender?: number;
    location?: string;
    job?: string;
    roles? : Role[];
    volunteering_history?: string;
    is_active?: boolean;
    created_at?: Date;
    level? : Level;
    personality?: Personality[];
    total_points? : number;
    traits_values?: TraitsValues[];

    constructor(user: Partial<User>) {
        if (!user) user = {};
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.username = user.username;
        this.date_of_birth = new Date(user.date_of_birth);
        this.phone = user.phone;
        this.gender = user.gender;
        this.location = user.location;
        this.job = user.job;
        this.roles = Role.fromArray(user.roles);
        this.volunteering_history = user.volunteering_history;
        this.is_active = user.is_active;
        this.created_at = new Date(user.created_at);
        this.level = new Level(user.level);
        this.personality = Personality.fromArray(user.personality);
        this.total_points = user.total_points;
        this.traits_values = TraitsValues.fromArray(user.traits_values);
    }

    public static fromDTO(dto : any) : User | null {
        return dto == null ? null : 
        new User({
            id: dto.id,
            name : dto.name,
            email : dto.email,
            username : dto.username,
            date_of_birth : dto.date_of_birth,
            phone : dto.phone,
            gender : dto.gender,
            location : dto.location,
            job : dto.job,
            roles : Role.fromDTOArray(dto.roles),
            volunteering_history : dto.volunteering_history,
            is_active : dto.is_active == 0 ? false : true,
            created_at : dto.created_at,
            level : Level.fromDTO(dto.level),
            personality : Personality.fromDTOArray(dto.personality),
            total_points : dto.total_points,
            traits_values : TraitsValues.fromDTOArray(dto.traits_values),
        });
    }
    public static fromDTOArray(dtoArray : any) : User[] {
        return dtoArray.map((dto) => User.fromDTO(dto));
    }
    public static fromArray(users: Partial<User>[]): User[] {
        return users.map((user) => new User(user));
    }
}