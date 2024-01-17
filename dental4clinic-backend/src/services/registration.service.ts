import * as authService from "./auth.service";
import * as userService from "./user.service";

export const registration = async (userData) => {
    try {
        const savedUser = userService.saveUserToMongo(userData);
        const tokenResponse = authService.createToken(savedUser);
        return { 
            token: tokenResponse, 
            user: savedUser, 
            userData: userData, 
            statusCode: 200 
        };
    } catch (error) {
        console.error('Registration Error:', error);
        return { error: 'Error registering user', statusCode: 500 };
    }
};
