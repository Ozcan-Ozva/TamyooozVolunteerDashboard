import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Media } from '../model/media';

@Injectable({
    providedIn: 'root',
})
export class MediaService {
    constructor(private http: HttpClient) {}

    imageUpload(file: File, custom_name?: string, preload?: boolean): { media: Observable<Media>; stub: string } {
        const form_data: FormData = new FormData();
        form_data.append('file', file, custom_name || file.name);
        const url = URL.createObjectURL(file);
        const obs = this.postFile('images', form_data).pipe(
            mergeMap((media_dtos) => {
                const media = Media.fromDTO(media_dtos[0]);
                if (preload) {
                    return this._preload(media);
                } else return of(media);
            })
        );
        return { media: obs, stub: url };
    }

    videoUpload(file: File, custom_name?: string) {
        const formData: FormData = new FormData();
        formData.append('file', file, custom_name || file.name);
        return this.postFile('videos', formData);
    }

    fileUpload(file: File) {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.postFile('files', formData);
    }

    handleError(error: Error) {
        console.log(error);
    }

    getMediaById(id: number): Observable<Media> {
        return this.http.get(`${environment.base_url}media/${id}`).pipe(map((dto) => Media.fromDTO(dto)));
    }

    postFile(endpoint: string, data: FormData): Observable<unknown> {
        return this.http.post(`${environment.base_url}files/${endpoint}/upload`, data, {});
    }

    private _preload(media: Media): Observable<Media> {
        return new Observable<Media>((observer) => {
            const preload_container = new Image();
            preload_container.onload = () => {
                preload_container.remove();
                observer.next(media);
            };
            preload_container.onerror = () => {
                observer.next(media);
            };
            preload_container.src = media.url;
        }).pipe<Media>(take(1));
    }
}
