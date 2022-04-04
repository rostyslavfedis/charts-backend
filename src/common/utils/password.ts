import * as crypto from 'crypto';

export const encryptPassword = (password: string, email: string): string => {
    return crypto
        .createHmac('sha512', `${password.length}+${email}`)
        .update(password)
        .digest('hex');
};

