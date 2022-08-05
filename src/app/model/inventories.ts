import { User } from './user';
import { Category } from './category';
import { Metric } from './metric';
import { Traits } from './traits';

export class Inventory {
    id:                         number;
    name?:                       string;
    description?:                string;
    shortcut?:                string;
    created_at?:                 Date;
    updated_at?:                 Date;
    traits?:                 Traits[];
    

    constructor(inventory: Partial<Inventory>) {
        if (!inventory) inventory = {};
        this.id = inventory.id;
        this.name = inventory.name;
        this.description = inventory.description;
        this.shortcut = inventory.shortcut;
        this.created_at = inventory.created_at;
        this.updated_at = inventory.updated_at;
        this.traits = Traits.fromArray(inventory.traits);
    }

    public static fromDTO(dto : any) : Inventory | null {
        console.log("this is dto");
        console.log(dto);
        return dto == null ? null :
        new Inventory({
            id: dto.id,
            name : dto.name,
            description: dto.description,
            shortcut: dto.shortcut,
            traits: Traits.fromDTOArray(dto.traits),
        });
    }

    public static fromDTOArray(dtoArray : any) : Inventory[] {
        console.log("this is inventory");
        console.log(dtoArray);
        return dtoArray.map((dto) => Inventory.fromDTO(dto));
    }
    public static fromArray(inventories: Partial<Inventory>[]): Inventory[] {
        return inventories.map((inventory) => new Inventory(inventory));
    }
}
