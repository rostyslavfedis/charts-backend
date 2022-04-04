import {JwtService} from "@nestjs/jwt";

import {Injectable} from "@nestjs/common";

export interface IJwtPayload {
    id: string
}

export interface TokenInterface {
    type: string;
    expiresIn: string | number;
    accessToken: string;
}



@Injectable()
export class TokenService {
    private salt: string;
    private readonly tokenExpiresIn: string | number;

    constructor(private jwtService: JwtService) {
        this.salt = 'salt'
        this.tokenExpiresIn = 604800000;
    }

    public createToken(payload: any):string {
        return this.jwtService.sign(payload, {
            expiresIn: this.tokenExpiresIn,
        });
    }

    public createAuthToken(payload: IJwtPayload): TokenInterface {
        return {
            type: "Bearer",
            expiresIn: this.tokenExpiresIn,
            accessToken: this.jwtService.sign(payload),
        };
    }

    public parseToken(token: string) {
        console.log('TOKEN', token);
        return this.jwtService.verify(token);
    }
}