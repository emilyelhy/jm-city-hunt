import React, { useState } from "react";
import { TextField, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function RegisterPage() {
    const [parti1Name, setParti1Name] = useState("");
    const [parti1Phone, setParti1Phone] = useState("");
    const [parti1Email, setParti1Email] = useState("");

    const [parti2Name, setParti2Name] = useState("");
    const [parti2Phone, setParti2Phone] = useState("");
    const [parti2Email, setParti2Email] = useState("");

    const [parti3Name, setParti3Name] = useState("");
    const [parti3Phone, setParti3Phone] = useState("");
    const [parti3Email, setParti3Email] = useState("");

    const [parti4Name, setParti4Name] = useState("");
    const [parti4Phone, setParti4Phone] = useState("");
    const [parti4Email, setParti4Email] = useState("");

    const [parti5Name, setParti5Name] = useState("");
    const [parti5Phone, setParti5Phone] = useState("");
    const [parti5Email, setParti5Email] = useState("");

    const [parti6Name, setParti6Name] = useState("");
    const [parti6Phone, setParti6Phone] = useState("");
    const [parti6Email, setParti6Email] = useState("");

    const [password, setPassword] = useState("");
    const [TCCheck, setTCCheck] = useState(false);

    return (
        <div>
            <h1>Register Title</h1>
            <div style={{ margin: 10 }}>
                <h4 style={{ margin: 15 }}>Participant 1 (PIC) *compulsory field</h4>
                <TextField variant="outlined" label="Full Name" value={parti1Name} onChange={(e) => setParti1Name(e.target.value)} required></TextField >
                <TextField variant="outlined" label="Phone No" value={parti1Phone} onChange={(e) => setParti1Phone(e.target.value)} required></TextField >
                <TextField variant="outlined" label="Email" value={parti1Email} onChange={(e) => setParti1Email(e.target.value)} required></TextField >
            </div>
            <div style={{ margin: 10 }}>
                <h4 style={{ margin: 15 }}>Participant 2</h4>
                <TextField variant="outlined" label="Full Name" value={parti2Name} onChange={(e) => setParti2Name(e.target.value)}></TextField >
                <TextField variant="outlined" label="Phone No" value={parti2Phone} onChange={(e) => setParti2Phone(e.target.value)} required={parti2Name.length > 0}></TextField >
                <TextField variant="outlined" label="Email" value={parti2Email} onChange={(e) => setParti2Email(e.target.value)} required={parti2Name.length > 0}></TextField >
            </div>
            <div style={{ margin: 10 }}>
                <h4 style={{ margin: 15 }}>Participant 3</h4>
                <TextField variant="outlined" label="Full Name" value={parti3Name} onChange={(e) => setParti3Name(e.target.value)}></TextField >
                <TextField variant="outlined" label="Phone No" value={parti3Phone} onChange={(e) => setParti3Phone(e.target.value)} required={parti3Name.length > 0}></TextField >
                <TextField variant="outlined" label="Email" value={parti3Email} onChange={(e) => setParti3Email(e.target.value)} required={parti3Name.length > 0}></TextField >
            </div>
            <div style={{ margin: 10 }}>
                <h4 style={{ margin: 15 }}>Participant 4</h4>
                <TextField variant="outlined" label="Full Name" value={parti4Name} onChange={(e) => setParti4Name(e.target.value)}></TextField >
                <TextField variant="outlined" label="Phone No" value={parti4Phone} onChange={(e) => setParti4Phone(e.target.value)} required={parti4Name.length > 0}></TextField >
                <TextField variant="outlined" label="Email" value={parti4Email} onChange={(e) => setParti4Email(e.target.value)} required={parti4Name.length > 0}></TextField >
            </div>
            <div style={{ margin: 10 }}>
                <h4 style={{ margin: 15 }}>Participant 5</h4>
                <TextField variant="outlined" label="Full Name" value={parti5Name} onChange={(e) => setParti5Name(e.target.value)}></TextField >
                <TextField variant="outlined" label="Phone No" value={parti5Phone} onChange={(e) => setParti5Phone(e.target.value)} required={parti5Name.length > 0}></TextField >
                <TextField variant="outlined" label="Email" value={parti5Email} onChange={(e) => setParti5Email(e.target.value)} required={parti5Name.length > 0}></TextField >
            </div>
            <div style={{ margin: 10 }}>
                <h4 style={{ margin: 15 }}>Participant 6</h4>
                <TextField variant="outlined" label="Full Name" value={parti6Name} onChange={(e) => setParti6Name(e.target.value)}></TextField >
                <TextField variant="outlined" label="Phone No" value={parti6Phone} onChange={(e) => setParti6Phone(e.target.value)} required={parti6Name.length > 0}></TextField >
                <TextField variant="outlined" label="Email" value={parti6Email} onChange={(e) => setParti6Email(e.target.value)} required={parti6Name.length > 0}></TextField >
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", margin: 30 }}>
                <h4 style={{ margin: 15 }}>Password</h4>
                <TextField variant="outlined" label="Password" value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
            </div>
            <div>
                <h3 style={{ marginBottom: 5 }}>T&C</h3>
                <h5 style={{ marginTop: 5 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A erat nam at lectus urna duis convallis convallis tellus. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Felis eget velit aliquet sagittis id. Sit amet facilisis magna etiam. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Elit eget gravida cum sociis natoque penatibus et magnis dis. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Bibendum est ultricies integer quis. Magna fermentum iaculis eu non diam phasellus.
                    <br />
                    Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Lectus mauris ultrices eros in cursus turpis massa tincidunt. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Fermentum dui faucibus in ornare. Erat nam at lectus urna duis convallis convallis. Imperdiet dui accumsan sit amet nulla facilisi. Eu nisl nunc mi ipsum faucibus. Dolor morbi non arcu risus quis varius quam quisque. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Porttitor massa id neque aliquam vestibulum morbi blandit. Nisi est sit amet facilisis magna etiam. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. Sit amet nulla facilisi morbi tempus iaculis urna. Dui faucibus in ornare quam viverra. Fermentum posuere urna nec tincidunt praesent semper. Nam libero justo laoreet sit amet cursus sit amet. A diam sollicitudin tempor id eu nisl nunc mi. Neque ornare aenean euismod elementum nisi. Elementum curabitur vitae nunc sed velit dignissim sodales ut.
                </h5>
                <FormGroup style={{ justifyContent: "center", alignItems: "center" }}>
                    <FormControlLabel
                        label="Agree"
                        required
                        control={
                            <Checkbox
                                checked={TCCheck}
                                onChange={(e) => setTCCheck(e.target.checked)}
                            />
                        }
                    />
                </FormGroup>
            </div>
        </div>
    )
}