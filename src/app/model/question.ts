export class Question {
    id?: number;
    title?: string;
    questionnaire_id?: number;
    created_at? : Date;
    updated_at? : Date;

    constructor(traits: Partial<Question>) {
        if (!traits) traits = {};
        this.id = traits.id;
        this.title = traits.title;
        this.questionnaire_id = traits.questionnaire_id;
        this.created_at = traits.created_at;
        this.updated_at = traits.updated_at;
    }

    public static fromDTO(dto : any) : Question | null {
        console.log("this is dto");
        console.log(dto);
        return dto == null ? null : 
        new Question({
            id: dto.id,
            title : dto.question,
            questionnaire_id : dto.questionnaire_id,
            created_at: dto.created_at,
            updated_at: dto.updated_at,
        });
    }

    public static fromDTOArray(dtoArray : any) : Question[] {
        return dtoArray.map((dto) => Question.fromDTO(dto));
    }
    public static fromArray(traits: Partial<Question>[]): Question[] {
        return traits.map((trait) => new Question(trait));
    }
}