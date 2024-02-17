import axios from "axios";
import { removeCookie } from "../hooks/cookie";
const home = "http://localhost:3001";

    const LogoutFunc = async () => {
        // setLoading(true);
        try {
        const response = await axios.get(`${home}/user/logout`)
        if (response.status === 200) {
            console.log(`logout success`)
            removeCookie("token");
            removeCookie("authorization");
            localStorage.clear();
            window.location.href = "/";
        }
        } catch (error) {
        console.error("Error logging out", error);
        }
    };
    
    export default LogoutFunc;


