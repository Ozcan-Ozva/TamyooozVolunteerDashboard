import { Inventory } from "./inventories";
import { Question } from "./question";

export class Questionnaire {
    id?: number;
    title?: string;
    description?: string;
    inventory_id?: number;
    answersLimit?: number;
    created_at? : Date;
    updated_at? : Date;
    questions?: Question[];
    inventories?: Inventory;

    constructor(traits: Partial<Questionnaire>) {
        if (!traits) traits = {};
        this.id = traits.id;
        this.title = traits.title;
        this.description = traits.description;
        this.inventory_id = traits.inventory_id;
        this.answersLimit = traits.answersLimit;
        this.created_at = traits.created_at;
        this.updated_at = traits.updated_at;
        this.questions = Question.fromArray(traits.questions);
        this.inventories = new Inventory(traits.inventories);
    }

    public static fromDTO(dto : any) : Questionnaire | null {
        console.log("this is dto");
        console.log(dto);
        return dto == null ? null : 
        new Questionnaire({
            id: dto.id,
            title : dto.title,
            description : dto.description,
            inventory_id : dto.inventory_id,
            answersLimit : dto.answersLimit,
            created_at: dto.created_at,
            updated_at: dto.updated_at,
            inventories: Inventory.fromDTO(dto.inventories),
            questions: Question.fromDTOArray(dto.questions),
        });
    }

    public static fromDTOArray(dtoArray : any) : Questionnaire[] {
        return dtoArray.map((dto) => Questionnaire.fromDTO(dto));
    }
    public static fromArray(traits: Partial<Questionnaire>[]): Questionnaire[] {
        return traits.map((trait) => new Questionnaire(trait));
    }
}