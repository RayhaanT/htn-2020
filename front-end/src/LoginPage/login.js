import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react'
import Container from '@material-ui/core/Container';
import "./login.css"
import { useHistory } from "react-router-dom";

export default function Login() {
    const history = useHistory();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div>
            <Container maxWidth="md">
                <p className="title">ADMIN LOGIN</p>
                <Form onSubmit={() => {

                    axios.post('https://webhook.site/17b313ea-a5dd-4f13-b8dc-d56cc21c67e2', {id, password})
                    .then(response =>{
                        console.log(this.state)
                        console.log(response)
                        
                        
                    }).catch(error =>{
                        console.log(error)
                    })

                    alert("submitted");
                    history.push("/heatmap");
                
                }}>
                    
                    <Form.Field
                        control={Input}
                        label='Government ID'
                        placeholder='27 digits'
                        name='id'
                        value={id}
                        onChange={(e) => setId(e.target.value)}

                    />

                    
                    <Form.Field
                        control={Input}
                        label='Password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Form.Field control={Button}>Submit</Form.Field>
                </Form>
        </Container>
        </div>
    )
}
