import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { AiOutlineMenu, AiOutlineMonitor } from "react-icons/ai";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MainPage from "./MainPage";
import ChangePasswordPage from "./ChangePasswordPage";
import ChangeMemberPage from "./ChangeMemberPage";

export default function Dashboard() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [currentPage, setCurrentPage] = useState("MainPage");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("group")) navigate("/login");
    }, [navigate]);

    const changePassword = () => {
        toggleDrawer(false);
        setCurrentPage("ChangePassword");
    };
    const changeMember = () => {
        toggleDrawer(false);
        setCurrentPage("ChangeMember");
    };
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };
    const PAGE_COMPONENT = [{ title: "Main Page", icon: AiOutlineMonitor }];
    const ACCOUNT_COMPONENT = [{ title: "Change Password", func: changePassword }, { title: "Change Member", func: changeMember }, { title: "Logout", func: logout }];

    const toggleDrawer = (status) => {
        setOpenDrawer(status);
    };

    const togglePage = (component) => {
        toggleDrawer(false);
        setCurrentPage(component.title.replace(/\s+/g, ''));
    };

    return (
        <div className="Dashboard" style={{ flex: 1, display: "flex" }}>
            <Button variant="outlined" style={{ position: "absolute", right: 20, top: 10 }} onClick={() => toggleDrawer(true)}>
                <AiOutlineMenu />
            </Button>
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => toggleDrawer(false)}
                style={{ width: "20%" }}
            >
                <List>
                    {PAGE_COMPONENT.map((component) => (
                        <ListItem key={component.title} disablePadding>
                            <ListItemButton onClick={() => togglePage(component)}>
                                <ListItemIcon>
                                    <component.icon />
                                </ListItemIcon>
                                <ListItemText primary={component.title}></ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {ACCOUNT_COMPONENT.map((component) => (
                        <ListItem key={component.title}>
                            <ListItemButton onClick={component.func}>
                                <ListItemText primary={component.title}></ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div style={{ flex: 1, display: "flex" }}>
                {currentPage === "MainPage" ?
                    <MainPage />
                    :
                    currentPage === "ChangePassword" ?
                        <ChangePasswordPage />
                        :
                        currentPage === "ChangeMember" ?
                            <ChangeMemberPage />
                            :
                            <></>
                }
            </div>
        </div>
    )
}