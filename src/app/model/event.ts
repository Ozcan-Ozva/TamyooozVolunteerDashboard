import { Category } from './category';

export class Event {
    id:                         number;
    name:                       string;
    description:                string;
    start_date:                 Date;
    end_date:                   Date;
    required_volunteers_number: number;
    status:                     number;
    created_at:                 Date;
    updated_at:                 Date;
    media:                      any[];
    categories:                 Category[];

    constructor(event: Partial<Event>) {
        if (!event) event = {};
        this.id = event.id;
        this.name = event.name;
        this.description = event.description;
        this.start_date = event.start_date;
        this.end_date = event.end_date;
        this.required_volunteers_number = event.required_volunteers_number;
        this.status = event.status;
        this.created_at = event.created_at;
        this.updated_at = event.updated_at;
        this.media = event.media;
        this.categories = Category.fromArray(event.categories);
    }

    public static fromDTO(dto : any) : Event | null {
        return dto == null ? null :
        new Event({
            id: dto.id,
            name : dto.name,
            description: dto.description,
            start_date: new Date(dto.start_date),
            end_date: new Date(dto.end_date),
            required_volunteers_number: dto.required_volunteers_number,
            status: dto.status,
            created_at: new Date(dto.created_at),
            updated_at: new Date(dto.updated_at),
            media: dto.media,
            categories: Category.fromDTOArray(dto.categories),
        });
    }

    public static fromDTOArray(dtoArray : any) : Event[] {
        return dtoArray.map((dto) => Event.fromDTO(dto));
    }
    public static fromArray(events: Partial<Event>[]): Event[] {
        return events.map((event) => new Event(event));
    }
}
