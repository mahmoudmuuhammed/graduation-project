import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MapboxOutput } from '../models/mapbox.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class MapboxService {

    constructor(private http: HttpClient) {}

    searchPlaces(query: string) {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
        return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ query }.json?types=place,locality&access_token=${ environment.mapboxConfig.apiKey }`)
        .pipe(map((res: MapboxOutput) => {
            return res.features;
        }))
    }
}