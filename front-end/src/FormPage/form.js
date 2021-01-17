import React, { Component } from 'react'
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
import "./form.css"



class PersonalForm extends Component {
    state = {
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        occupation: "",
        email: "",
        password: "",
        longitude: "",
        latitude: "",
        permission: "1"
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () =>{
        const { age, occupation, gender, dob, longitude, latitude, firstName, lastName, password, email, permission } = this.state
        axios.post('https://webhook.site/17b313ea-a5dd-4f13-b8dc-d56cc21c67e2', this.state)
            .then(response =>{
                console.log(this.state)
                console.log(response)
            }).catch(error =>{
                console.log(error)
            })
        
            alert("submitted")
    }
    render() {
        const { age, occupation, gender, dob, longitude, latitude, firstName, lastName, password, email, permission } = this.state
        return (
            <Container maxWidth="md">
                <p className="title">Personal Information Form</p>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        label='First name'
                        placeholder='First name'
                        name='firstName'
                        value={firstName}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Input}
                        label='Last name'
                        placeholder='Last name'
                        name='lastName'
                        value={lastName}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Select}
                        name='gender'
                        value={firstName}
                        label='Gender'
                        placeholder='Gender'
                        options={[
                            {key: "male", text: "Male", value:"male"},
                            {key: "female", text: "Female", value:"female"},
                            {key: "other", text: "Other", value:"Other"}
                            
                        ]}
                        name='gender'
                        value={gender}
                        onChange={this.handleChange}
                    />
                    </Form.Group>

                    <Form.Field
                        control={Input}
                        label='Date of Birth'
                        placeholder='dd/mm/yy'
                        name='dob'
                        value={dob}
                        onChange={this.handleChange}
                    />

                    
                    <Form.Field
                        control={Input}
                        label='Occupation'
                        placeholder='Ex. Nurse'
                        name='occupation'
                        value={occupation}
                        onChange={this.handleChange}
                    />

                    <Form.Field>
                        <Radio
                        label='I am an essential worker'
                        name='radioGroup'

                        />
                    </Form.Field>

                    <Form.Field
                        control={Input}
                        label='Email'
                        placeholder='Ex. name@gmail.com'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                    />

                    <Form.Field
                        control={Input}
                        label='Password'
                        placeholder='8+ characters'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                    />
                    
                    <Form.Field
                        control={TextArea}
                        label='Additional Information'
                        placeholder='If there is anything that you would like to let us know, enter it here.'

                    />

                    <Form.Field
                    control={Checkbox}
                    label='I agree to the Terms and Conditions'
                    
                    />
                    <Form.Field control={Button} onClick={this.submit}>Submit</Form.Field>
                </Form>
        </Container>
        )
    }
}

export default PersonalForm
