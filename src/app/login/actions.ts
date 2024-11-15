"use server"

export const logIn = async (idToken: string) => {
    try {
        const result = await fetch(`https://localhost:3001/auth/login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        });
        console.log(result);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}