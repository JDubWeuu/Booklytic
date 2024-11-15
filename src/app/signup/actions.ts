'use server'

interface SignupData {
    name: string | null;
    email: string | null;
    password: string | null;
    age: string | null;
}

export async function signup(formData: FormData, idToken: string) {
    const userInfo: SignupData = {
        name: formData.get('name')?.toString() ?? null,
        email: formData.get('email')?.toString() ?? null,
        password: formData.get('password')?.toString() ?? null,
        age: formData.get('age')?.toString() ?? null
    };
    // make a copy of the userDetails object
    const userDetails = {...userInfo};

    // make a request to backend api
    try {
        const res = await fetch('https://localhost:3001/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(userDetails),
        });
        
        const result = await res.json();

        return result;
    }
    catch (error) {
        console.error(error);

        return null;
    }
}