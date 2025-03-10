import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core"
import { environment } from "../../environment/environment";

export class ApiBase {

    http = inject(HttpClient);
    environment = environment;

    get(url: string, params: any) {
        return this.http.get(url, params);
    }

}