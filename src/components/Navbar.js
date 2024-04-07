import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { decodeJwt } from "jose";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "./Avatar";
import { Icons } from "./Icons";

const Navigation = () => {
  const [userSession, setUserSession] = useState();
  console.log(userSession);
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
    <Navbar bg="light" expand="lg" className="navbar-light">
      <Container>
        {/* Brand label set to the left */}
        <Navbar.Brand>
          <Link to="/" className="navbar-label" style={{ textDecoration: 'none', color: '#FF6347', fontWeight: 'bold' }}>
            Vehicle Counting
          </Link>
        </Navbar.Brand>
        {/* Toggler for responsive design */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Navigation links set to the right */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/statistics">Statistics</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            {
              !userSession ? (
                <div onClick={() => login()} className="authbtn">
                  <Icons.google/>
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
              ) : (
                <Avatar
                  setUserSession={setUserSession}
                  image={userSession.profileImgUrl}
                  name={userSession.username}
                  email={userSession.email}
                />
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;