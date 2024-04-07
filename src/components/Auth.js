import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import axios from "axios";
import { Icons } from "./Icons";
import { useEffect } from "react";

const Auth = ({setUserSession}) => {
    useEffect(() => {
        setUserSession(JSON.parse(localStorage.getItem("userSession")));
    }, []);
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
                    isNotifi: 0,
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
        <div onClick={() => login()} className="authbtn">
            <Icons.google />
            <div className="google">
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        // console.log(credentialResponse);
                        const { credential } = credentialResponse;
                        const payload = credential
                            ? decodeJwt(credential)
                            : undefined;
                        if (payload) {
                            // console.log(payload);
                            const userSess = {
                                googleId: payload.sub,
                                email: payload.email,
                                profileImgUrl: payload.picture,
                                username: payload.name,
                            };
                            localStorage.setItem(
                                "userSession",
                                JSON.stringify(userSess)
                            );
                            setUserSession(userSess);

                        }
                        window.location.reload();
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                    useOneTap
                    theme="outline"
                    type="icon"
                    shape="circle"
                />
            </div>
        </div>
    )
}
export default Auth