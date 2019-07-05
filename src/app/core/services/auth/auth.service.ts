import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, IToken, IUser } from '../../models/IAuth';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL, OAUTH2_GRANT_TYPES } from '../../../config/api.rest.config';
import JwtDecode from 'jwt-decode';
@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    public login(credentials: ILogin): Observable<IToken> {
        const params = new URLSearchParams();
        params.append('username', credentials.username);
        params.append('password', credentials.password);
        params.append('grant_type', OAUTH2_GRANT_TYPES.PASSWORD);
        return this.http.post<IToken>(`${API_URL.OAUTH2_SERVER}${API_URL.TOKEN_ENDPOINT}`, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .pipe(
                map(user => {
                    if (user && user.access_token) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    return user as IToken;
                }));
    }

    public logout() {
      //  localStorage.removeItem('currentUser');
        // this.router.navigate(['/login']);
    }

    public getAuthToken(): string {
        const currentUser: IToken = JSON.parse(localStorage.getItem('currentUser'));
        return (currentUser != null) ? currentUser.access_token : undefined;
    }

    public refreshToken(): Observable<IToken> {
        const currentUser: IToken = JSON.parse(localStorage.getItem('currentUser'));
        const credentials = new URLSearchParams();
        credentials.append('refresh_token', currentUser.refresh_token);
        credentials.append('grant_type', OAUTH2_GRANT_TYPES.REFRESH_TOKEN);
        return this.http.post<IToken>(`${API_URL.OAUTH2_SERVER}${API_URL.TOKEN_ENDPOINT}`, credentials.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .pipe(
                map(user => {
                    if (user && user.access_token) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    return user as IToken;
                }));
    }

    public getUserCredentials(fields: string[] = []): any {
        const { access_token } = JSON.parse(localStorage.getItem('currentUser'));
        const decodeToken: IUser = new JwtDecode(access_token);
        switch (fields.length) {
            case 0:
                return decodeToken;
            case 1:
                return decodeToken[fields[0]];
            case 2:
                const credentials = {};
                credentials[fields[0]] = decodeToken[fields[0]];
                credentials[fields[1]] = decodeToken[fields[1]];
                return credentials;
            default:
                return fields.reduce((lastValue: any, currentValue: string) => {
                    lastValue[`${currentValue}`] = decodeToken[currentValue];
                    return lastValue;
                }, {});
        }
    }

    public add_usuarios() {
        return this.http.post(`${API_URL.API_BASE_URL}rol`, {
            rol: 'Nuevo rol',
            description: 'Descripción',
            activo: true,
            permisos: []
        });
    }
}

