export class Traits {
    id: number;
    name: string;
    description: string;
    inventory_id: number;
    created_at : Date;
    updated_at : Date;
    average: string;

    constructor(traits: Partial<Traits>) {
        if (!traits) traits = {};
        this.id = traits.id;
        this.name = traits.name;
        this.description = traits.description;
        this.inventory_id = traits.inventory_id;
        this.created_at = traits.created_at;
        this.updated_at = traits.updated_at;
        this.average = traits.average;
    }

    public static fromDTO(dto : any) : Traits | null {
        return dto == null ? null : 
        new Traits({
            id: dto.id,
            name : dto.name,
            description : dto.description,
            inventory_id : dto.inventory_id,
            created_at: dto.created_at,
            updated_at: dto.updated_at,
            average : dto.average,
        });
    }

    public static fromDTOArray(dtoArray : any) : Traits[] {
        return dtoArray.map((dto) => Traits.fromDTO(dto));
    }
    public static fromArray(traits: Partial<Traits>[]): Traits[] {
        return traits.map((trait) => new Traits(trait));
    }
}