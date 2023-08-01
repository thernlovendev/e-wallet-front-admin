import { Card, Grid, Step, StepLabel, Stepper } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React, { useState } from "react";
import About from "./About";
import Address from "./Address";
import Socials from "./Socials";
import Identity from "./Identity";
import { useSoftUIController } from "context";
import SoftAlert from "components/SoftAlert";
import { editProfileInfo, SignUpR } from "apis/request";
import { SweetAlert } from "apis/sweetAlert";


export default function NewUser() {

    const [controller, dispatch] = useSoftUIController();

    const nextPage = () => {
        setActiveStep((prev) => formStep[prev.index + 1])
    }

    const prevPage = () => {
        setActiveStep((prev) => formStep[prev.index - 1])
    }

    const handleNewUser = (user) => {
      console.log(user)
      SignUpR(user.email, user.password, user.name, user.lastName, user.phone, user.country, 
        user.day, user.month, user.year).then(user => {
          SweetAlert("success", "Good", "User created");
        }).catch(error => {
        if(error === 400){
          SweetAlert("warning", "Ooops", "Email already in use")
        }else{
          SweetAlert("warning", "Ooops", "Something went wrong")
        }
      })
    }

    const formStep = [
        { label: "New User", index: 0, element: <About onSave={handleNewUser} /> },
        //{ label: "First Top-up", index: 2, element: <Socials /> },
    ];
    
    const [activeStep, setActiveStep] = useState(formStep[0]);

        return (
            <>
              <DashboardLayout>
                <Stepper activeStep={activeStep.index} alternativeLabel>
                  {formStep.map((step, index) => (
                    <Step >
                      <StepLabel>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Grid container spacing={3} className="justify-content-center">
                  <Grid item xs={12} sm={10} xl={10} className="text-center">
                    <Card
                      sx={{
                        boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                        p: 1,
                      }}
                    >
                      {activeStep && activeStep.element}
        {/*              <SoftBox mb={1} px={2} display="flex" justifyContent="space-between">
                        {formStep[0].index === activeStep.index ? (
                          <div></div>
                        ) : (
                          <SoftButton
                            variant="gradient"
                            color="white"
                            onClick={() => setActiveStep((prev) => formStep[prev.index - 1])}
                          >
                            Prev
                          </SoftButton>
                        )}
                        {activeStep.index === formStep[formStep.length - 1].index ? (
                          <SoftButton variant="gradient" color="dark" onClick={() => {}}>
                            Send
                          </SoftButton>
                        ) : (
                          <SoftButton
                            variant="gradient"
                            color="dark"
                            onClick={() => setActiveStep((prev) => formStep[prev.index + 1])}
                          >
                            Next
                          </SoftButton>
                        )}
                      </SoftBox>*/}
                    </Card>
                  </Grid>
                </Grid>
              </DashboardLayout>
            </>
          );
  
}