import {
    useContext,
    useEffect,
    useState,
    createContext
} from 'react';
import { login as performLogin, verify as performVerify, resend as performResend, register as performRegister, oAuth2Login as performOAuth2Login } from '../../service/AuthService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const decodeToken = (token) => {
        const decodedToken = jwtDecode(token);
        setUser({
            email: decodedToken.sub,
            id: decodedToken.userId,
            fullName: decodedToken.fullName,
            role: decodedToken.role
        });
    };

    const setUserFromToken = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            decodeToken(token);
        }
    };

    useEffect(() => {
        setUserFromToken();
    }, []);

    const login = async (loginData) => {
        try {
            const response = await performLogin(loginData);
            console.log("response", response);
            if (response.status === 200) {
                const jwtToken = response.data.token;
                localStorage.setItem("access_token", jwtToken);
                decodeToken(jwtToken);
            } else {
                throw new Error(response.message);
            }
            
            return response;
        } catch (error) {
            throw error;
        }
    };

    console.log("sdfds", user);

    const verify = async (email, otp) => {
        try {
            const response = await performVerify(email, otp);
            if (response.status === 200) {
                const jwtToken = response.data.token;
                localStorage.setItem("access_token", jwtToken);
                localStorage.removeItem("email");
                decodeToken(jwtToken);
            } else {
                throw new Error(response.message);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    const resend = async (email) => {
        try {
            const response = await performResend(email);
            if (response.status === 200) {
                return response;
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const register = async (registerData) => {
        try {
            const response = await performRegister(registerData);
            if (response.status === 201) {
                localStorage.setItem("email", registerData.email);
                return response;
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const oAuth2Login = async (tokenId) => {
        try {
            const response = await performOAuth2Login(tokenId);
            if (response.status === 200) {
                const jwtToken = response.data.token;
                localStorage.setItem("access_token", jwtToken);
                decodeToken(jwtToken);
            } else {
                throw new Error(response.message);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }


    const logout = () => {
        localStorage.removeItem("access_token");
        setUser(null);
    }

    const isUserAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            logout();
            return false;
        }
        return true;
    }

    const isAdmin = () => {
        if(!user) return false;
        return user.role === "ADMIN";
    }


    const isMember = () => {
        if(!user) return false;
        return user.role === "MEMBER";
    }


    const isLibrarian = () => {
        if(!user) return false;
        return user.role === "LIBRARIAN";
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            verify,
            resend,
            register,
            oAuth2Login,
            logout,
            isUserAuthenticated,
            isAdmin,
            isMember,
            isLibrarian,
            setUserFromToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
