export class TokenResponseDTO {
    type: string;
    expiresIn: string | number;
    accessToken: string;

    constructor(token) {
        this.type = token.type;
        this.expiresIn = token.expiresIn;
        this.accessToken = token.accessToken;
    }
}