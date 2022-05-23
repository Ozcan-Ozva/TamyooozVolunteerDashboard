import { Permission } from "./permission";

export class Role {
    id: number;
    name: string;
    guard_name: string;
    created_at : Date;
    updated_at : Date;
    permissions? : Permission[];

    constructor(role: Partial<Role>) {
        if (!role) role = {};
        this.id = role.id;
        this.name = role.name;
        this.guard_name = role.guard_name;
        this.created_at = role.created_at;
        this.updated_at = role.updated_at;
        this.permissions = Permission.fromArray(role.permissions);
    }

    public static fromDTO(dto : any) : Role | null {
        return dto == null ? null : 
        new Role({
            id: dto.id,
            name : dto.name,
            guard_name : dto.guard_name,
            created_at: dto.created_at,
            updated_at: dto.updated_at,
            permissions: Permission.fromDTOArray(dto.permissions),
        });
    }

    public static fromDTOArray(dtoArray : any) : Role[] {
        return dtoArray.map((dto) => Role.fromDTO(dto));
    }
    public static fromArray(roles: Partial<Role>[]): Role[] {
        return roles.map((roles) => new Role(roles));
    }
}