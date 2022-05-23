export class Admin {
    id: number;
    name: string;
    email: string;
    roles : number[];
    created_at: Date;

    constructor(admin: Partial<Admin>) {
        if (!admin) admin = {};
        this.id = admin.id;
        this.name = admin.name;
        this.email = admin.email;
        this.roles = admin.roles;
        this.created_at = new Date(admin.created_at);
    }

    public static fromDTO(dto : any) : Admin | null {
        return dto == null ? null : 
        new Admin({
            id: dto.id,
            name : dto.name,
            email : dto.email,
            roles: dto.roles,
            created_at : dto.created_at,
        });
    }
    public static fromDTOArray(dtoArray : any) : Admin[] {
        return dtoArray.map((dto) => Admin.fromDTO(dto));
    }
    public static fromArray(admins: Partial<Admin>[]): Admin[] {
        return admins.map((admin) => new Admin(admin));
    }
}