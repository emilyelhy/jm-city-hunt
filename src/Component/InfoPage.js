import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function InfoPage() {
    const navigate = useNavigate();

    const navToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="InfoPage">
            <h1>Event Title</h1>
            <h4>
                Event Intro
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A erat nam at lectus urna duis convallis convallis tellus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Felis eget velit aliquet sagittis id. Sit amet facilisis magna etiam. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Elit eget gravida cum sociis natoque penatibus et magnis dis. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Bibendum est ultricies integer quis. Magna fermentum iaculis eu non diam phasellus.
            </h4>
            <Button variant="contained" style={{ marginRight: 10 }}>Register</Button>
            <Button variant="contained" style={{ marginLeft: 10 }} onClick={navToLogin}>Login</Button>
            <h4>
                Event T&C
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A erat nam at lectus urna duis convallis convallis tellus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Felis eget velit aliquet sagittis id. Sit amet facilisis magna etiam. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Elit eget gravida cum sociis natoque penatibus et magnis dis. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Bibendum est ultricies integer quis. Magna fermentum iaculis eu non diam phasellus.
                <br />
                Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Lectus mauris ultrices eros in cursus turpis massa tincidunt. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Fermentum dui faucibus in ornare. Erat nam at lectus urna duis convallis convallis. Imperdiet dui accumsan sit amet nulla facilisi. Eu nisl nunc mi ipsum faucibus. Dolor morbi non arcu risus quis varius quam quisque. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Porttitor massa id neque aliquam vestibulum morbi blandit. Nisi est sit amet facilisis magna etiam. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. Sit amet nulla facilisi morbi tempus iaculis urna. Dui faucibus in ornare quam viverra. Fermentum posuere urna nec tincidunt praesent semper. Nam libero justo laoreet sit amet cursus sit amet. A diam sollicitudin tempor id eu nisl nunc mi. Neque ornare aenean euismod elementum nisi. Elementum curabitur vitae nunc sed velit dignissim sodales ut.
            </h4>
        </div>
    )
}