"use client";
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

export function Avatar({ image, name, email, setUserSession }) {
    const logout = () => {
        localStorage.removeItem("userSession");
        window.location.reload();
        setUserSession()
    };
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}>
            <img
                className="avatarimg"
                src={image}
                alt="avatar"
                width={40}
                height={40}
                style={{borderRadius:"100%"}}
                priority={true}
            />
        </a>
    ));
    return (
        <div>
            <Dropdown align="end">
                <Dropdown.Toggle as={CustomToggle} className='dropmenutoggle' />
                <Dropdown.Menu>
                    <Dropdown.Item>{name}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>{email}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}