import React, { useState } from 'react'
import SoftBox from 'components/SoftBox'
import SoftTypography from 'components/SoftTypography'
import { Grid } from '@mui/material'
import SoftButton from 'components/SoftButton'
import SoftInput from 'components/SoftInput'

export default function About({onSave}) {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [CEmail, setCEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cPass, setCPass] = useState("");
    const [phone, setPhone] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");

    const handleFormChange = (e) => {
        if (e.target.name === "name") {
          setName(e.target.value);
        }
        if (e.target.name === "lastName") {
          setLastName(e.target.value);
        }
        if (e.target.name === "email") {
          setEmail(e.target.value);
        }
        if (e.target.name === "CEmail") {
          setCEmail(e.target.value);
        }
        if (e.target.name === "pass") {
          setPass(e.target.value);
        }
        if (e.target.name === "cPass") {
          setCPass(e.target.value);
        }
        if(e.target.name === "phone"){
            setPhone(e.target.value)
        }
        if (e.target.name === "day") {
            setDay(e.target.value);
        }
        if (e.target.name === "month") {
            setMonth(e.target.value);
        }
        if (e.target.name === "year") {
          setYear(e.target.value);
        }
        if (e.target.name === "country") {
            setCountry(e.target.value);
        }
      };


    const handleSubmit = (e) => {
        e.preventDefault();
      
        // Verificar campos obligatorios
        if (
          name.trim() === "" ||
          lastName.trim() === "" ||
          email.trim() === "" ||
          CEmail.trim() === "" ||
          pass.trim() === "" ||
          cPass.trim() === "" ||
          day.trim() === "" ||
          month.trim() === "" ||
          year.trim() === "" ||
          country.trim() === ""
        ) {
          // Al menos un campo está vacío
          console.log("Por favor, completa todos los campos");
          return;
        }
      
        // Verificar coincidencia de correos electrónicos
        if (email !== CEmail) {
          console.log("Los correos electrónicos no coinciden");
          return;
        }
      
        // Verificar coincidencia de contraseñas
        if (pass !== cPass) {
          console.log("Las contraseñas no coinciden");
          return;
        }
      
        // Todos los campos están completos y las coincidencias son correctas
        const data = {
            name: name,
            lastName: lastName,
            email: email, 
            password: pass,
            day: day,
            month: month,
            year: year,
            country: country,
            phone: phone
        }
        onSave(data)
    };

    return (<>
        <SoftBox
            pt={2}
            mb={3}
            px={2}
        >
            <SoftBox display="flex" flexDirection="column" justifyContent="start">
                <SoftTypography variant="h5" fontWeight="medium" textAlign="left">
                    New User
                </SoftTypography>
                <SoftBox mb={1} lineHeight={0} textAlign="left">
                    <SoftTypography
                        variant="h6"
                        fontWeight="light"
                        color="text"
                        textAlign="left"
                    >
                        Mandatory information
                    </SoftTypography>
                </SoftBox>
            </SoftBox>
            <SoftBox textAlign="left">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={4}>
                        <label>First Name</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="eg. Michael"
                            name="name"
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={4}>
                        <label>Last Name</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="text"
                            placeholder="eg. Prior"
                            name="lastName"
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={4}>
                        <label>User Role</label>
                        <select
                            class="form-select"
                            id="inputGroupSelect03"
                            aria-label="Example select with button addon"
                            onChange={handleFormChange}
                        >
                            <option selected>Choose role</option>
                            <option value="1">Admin</option>
                            <option value="2">Agent</option>
                            <option value="3">User</option>
                        </select>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Email Address</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="email"
                            placeholder="eg. soft@dashboard.com"
                            name="email"
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Repeat Email Address</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="email"
                            placeholder="eg. soft@dashboard.com"
                            name="CEmail"
                            onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Password</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="password"
                            placeholder="******"
                            name="pass"
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Repeat Password</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="password"
                            placeholder="******"
                            name="cPass"
                            onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Phone</label>
                        <input
                            class="multisteps-form__input form-control"
                            type="phone"
                            placeholder="4455667788"
                            name="phone"
                            onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Day BirthDay</label>
                        <SoftInput
                            min="1"
                            type="number"
                            placeholder="Day"
                            name="day"
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Month BirthDay</label>
                        <SoftInput
                        min="1"
                        type="number"
                        placeholder="Month"
                        name="month"
                        onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Year BirthDay</label>
                        <SoftInput
                        min="1"
                        type="number"
                        placeholder="Year"
                        name="year"
                        onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} xl={6}>
                        <label>Country</label>
                            <select name="country" class="form-select" id="country-select" onChange={handleFormChange}>
                                <option value="GB">United Kingdom</option>
                                <option value="US">The United States</option>
                            </select>
                    </Grid>
                </Grid>
            </SoftBox>
            <SoftBox mb={1} mt={2} px={2} display="flex" justifyContent="flex-end">
                <SoftButton
                        variant="gradient"
                        color="dark"
                        onClick={handleSubmit}
                    >
                        Create User
                </SoftButton>
            </SoftBox> 
        </SoftBox>
    </>)
}