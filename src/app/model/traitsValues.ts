export class TraitsValues {
    id: number;
    user_id: number;
    trait_id: number;
    value: number;
    created_at : Date;
    updated_at : Date;

    constructor(traits: Partial<TraitsValues>) {
        if (!traits) traits = {};
        this.id = traits.id;
        this.user_id = traits.user_id;
        this.trait_id = traits.trait_id;
        this.value = traits.value;
        this.created_at = traits.created_at;
        this.updated_at = traits.updated_at;
    }

    public static fromDTO(dto : any) : TraitsValues | null {
        return dto == null ? null : 
        new TraitsValues({
            id: dto.id,
            user_id : dto.user_id,
            trait_id: dto.trait_id,
            value: dto.value,
            created_at: dto.created_at,
            updated_at: dto.updated_at
        });
    }

    public static fromDTOArray(dtoArray : any) : TraitsValues[] {
        return dtoArray.map((dto) => TraitsValues.fromDTO(dto));
    }
    public static fromArray(traits: Partial<TraitsValues>[]): TraitsValues[] {
        return traits.map((trait) => new TraitsValues(trait));
    }
}