import React, { useState } from "react";
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { AiOutlineMenu, AiOutlineHistory } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Location from "./Location";
import History from "./History";

export default function Dashboard() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [currentPage, setCurrentPage] = useState("Location");
    const navigate = useNavigate();
    
    const changePassword = () => {
        // nav to change password page
    };
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };
    const PAGE_COMPONENT = [{ title: "Location", icon: BiCurrentLocation }, { title: "History", icon: AiOutlineHistory }];
    const ACCOUNT_COMPONENT = [{ title: "Change Password", func: changePassword }, { title: "Logout", func: logout }];

    const toggleDrawer = (status) => {
        setOpenDrawer(status);
    };

    const togglePage = (component) => {
        toggleDrawer(false);
        setCurrentPage(component.title);
    };

    return (
        <div className="Dashboard" style={{ flex: 1, display: "flex", height: "100vh" }}>
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
            <div style={{ flex: 1, display: "flex", height: "100vh" }}>
                {currentPage === "Location" ? <Location /> : currentPage === "History" ? <History /> : <></>}
            </div>
        </div>
    )
}