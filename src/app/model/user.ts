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
    volunteering_history?: string;
    is_active?: boolean;
    created_at?: Date;

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
        this.volunteering_history = user.volunteering_history;
        this.is_active = user.is_active;
        this.created_at = new Date(user.created_at);
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
            volunteering_history : dto.volunteering_history,
            is_active : dto.is_active == 0 ? false : true,
            created_at : dto.created_at,
        });
    }
    public static fromDTOArray(dtoArray : any) : User[] {
        return dtoArray.map((dto) => User.fromDTO(dto));
    }
    public static fromArray(users: Partial<User>[]): User[] {
        return users.map((user) => new User(user));
    }
}