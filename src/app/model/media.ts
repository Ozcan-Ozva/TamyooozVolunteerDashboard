export class Media {
    id: number;
    // TODO remove
    title: string;
    type: MediaType;
    url: string;
    thumbUrl: string;
    webThumbUrl: string;
    createdAt: Date;
    extension: string;

    constructor(media: Media) {
        this.id = media.id || null;
        this.title = media.title || '';
        this.type = media.type || MediaType.Image;
        this.url = media.url || null;
        this.thumbUrl = media.thumbUrl || null;
        this.webThumbUrl = media.webThumbUrl || null;
        this.createdAt = media.createdAt ? new Date(media.createdAt) : new Date();
        if (typeof this.url === 'string' && media.url.lastIndexOf('.') >= 0 && !media.extension) {
            this.extension = media.url.slice(media.url.lastIndexOf('.') + 1, media.url.length) || null;
        }
    }

    public static fromDTO(dto: any): Media {
        return dto == null
            ? null
            : new Media({
                  id: dto.id,
                  title: dto.title,
                  type: dto.type,
                  url: dto.url,
                  thumbUrl: dto.thumbUrl,
                  webThumbUrl: dto.webThumbUrl,
                  createdAt: dto.createdAt,
                  extension: null,
              });
    }
    public static fromDTOArray(dtos: any[]): Media[] {
        return dtos.map((dto) => Media.fromDTO(dto));
    }
    public static fromArray(media: Media[]): Media[] {
        return media.map((meduim) => new Media(meduim));
    }
}

export class StubMedia extends Media {
    public static last_cid: number = -1;
    public readonly cid = StubMedia.last_cid--;
    public is_stub = true;
    constructor(url: string, title: string, type: MediaType, extension: string = null) {
        super({
            id: null,
            title,
            url,
            type,
            thumbUrl: null,
            webThumbUrl: null,
            createdAt: new Date(),
            extension: extension,
        });
    }

    is(cid: number): boolean {
        return this.cid === cid;
    }
}

export enum MediaType {
    Video = 'video',
    Audio = 'audio',
    Image = 'images',
    Files = 'files',
}
