import { Traits } from "./traits";

export class Personality {
    id: number;
    name: string;
    description: string;
    shortcut : string;
    created_at : Date;
    updated_at : Date;
    traits : Traits[]

    constructor(personality: Partial<Personality>) {
        if (!personality) personality = {};
        this.id = personality.id;
        this.name = personality.name;
        this.description = personality.description;
        this.shortcut = personality.shortcut;
        this.created_at = personality.created_at;
        this.updated_at = personality.updated_at;
        this.traits = Traits.fromArray(personality.traits);
    }

    public static fromDTO(dto : any) : Personality | null {
        return dto == null ? null : 
        new Personality({
            id: dto.id,
            name : dto.name,
            description : dto.description,
            shortcut : dto.shortcut,
            created_at: dto.created_at,
            updated_at: dto.updated_at,
            traits: Traits.fromDTOArray(dto.traits)
        });
    }

    public static fromDTOArray(dtoArray : any) : Personality[] {
        return dtoArray.map((dto) => Personality.fromDTO(dto));
    }
    public static fromArray(persopnalities: Partial<Personality>[]): Personality[] {
        return persopnalities.map((persopnality) => new Personality(persopnality));
    }
}