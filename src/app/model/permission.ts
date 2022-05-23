export class Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at : Date;
    updated_at : Date;

    constructor(permission: Partial<Permission>) {
        if (!permission) permission = {};
        this.id = permission.id;
        this.name = permission.name;
        this.guard_name = permission.guard_name;
        this.created_at = permission.created_at;
        this.updated_at = permission.updated_at;
    }

    public static fromDTO(dto : any) : Permission | null {
        return dto == null ? null : 
        new Permission({
            id: dto.id,
            name : dto.name,
            guard_name : dto.guard_name,
            created_at: dto.created_at,
            updated_at: dto.updated_at
        });
    }

    public static fromDTOArray(dtoArray : any) : Permission[] {
        return dtoArray.map((dto) => Permission.fromDTO(dto));
    }
    public static fromArray(permissions: Partial<Permission>[]): Permission[] {
        return permissions.map((permissions) => new Permission(permissions));
    }
}