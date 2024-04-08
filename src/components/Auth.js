import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import { Icons } from "./Icons";
import Button from 'react-bootstrap/Button';

const Auth = ({setUserSession}) => {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const payload = await axios
                .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                })
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    console.error("Error fetching user info:", error.response.data);
                });
            if (payload) {
                const userSess = {
                    googleId: payload.sub,
                    email: payload.email,
                    profileImgUrl: payload.picture,
                    username: payload.name,
                };
                localStorage.setItem("userSession", JSON.stringify(userSess));
                setUserSession(userSess);
            }
            window.location.reload();
        },
        onError: () => {
            console.log("Login Failed");
        },
        flow: "implicit",
    });
    return (
        <Button variant="dark" className="loginbutton" onClick={() =>login()}>
            <Icons.google />
            Login with Google Account
        </Button>
    )
}
export default Auth