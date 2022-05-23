export class Category {
    id: number;
    name: string;
    description: string;
    created_at: Date

    constructor(category: Partial<Category>) {
        if (!category) category = {};
        this.id = category.id;
        this.name = category.name;
        this.description = category.description;
        this.created_at = new Date(category.created_at);
    }

    public static fromDTO(dto : any) : Category | null {
        return dto == null ? null : 
        new Category({
            id: dto.id,
            name: dto.name,
            description: dto.description,
            created_at: dto.created_at,
        });
    }

    public static fromDTOArray(dtoArray : any) : Category[] {
        return dtoArray.map((dto) => Category.fromDTO(dto));
    }
    public static fromArray(categories: Partial<Category>[]): Category[] {
        return categories.map((category) => new Category(category));
    }
}