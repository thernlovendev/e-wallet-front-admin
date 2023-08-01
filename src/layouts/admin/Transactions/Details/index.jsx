// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftTypography from "components/SoftTypography";
import { Card } from "@mui/material";
import SoftButton from "components/SoftButton";
import TimelineDetails from "./Timeline";
import PaymentDetails from "./PaymentDetails";
import TransactionAmount from "./TransactionAmount";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTransaction } from "apis/request";
import { getDataUser } from "apis/request";
import { refoundTransaction } from "apis/request";
import { SweetAlert } from "apis/sweetAlert";

function TransactionDetails() {
  
  const {id} = useParams();
  const [transaction, setTransaction] = useState({
    id: "",
    action: "",
    amount: 0,
    currency: "",
    date: "",
    objectDate: {
      year: 0,
      day: 0,
      month: 0
    },
    status: "",
    userID: "",
    userInteraction: ""
  })
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    idNumber: "",
    id: ""
  })

  useEffect(() => {
    getTransaction(id).then(transaction => {
      console.log(transaction)
      setTransaction(transaction)
      getDataUser(transaction.userID).then(user => {
        setUser(user)
      })
    })
  }, [id])

  const handleRefound = () => {
    refoundTransaction(transaction).then(async (data) => {
      console.log("entro")
      SweetAlert("success", "Good", "Charge refounded");
      console.log(data)
    }).catch(async (error) => {
      console.log(error)
      if(error == 406){
        SweetAlert("warning", "Ooops", "Charge already refounded")
      }else{
        SweetAlert("warning", "Ooops", "Something went wrong");
      }
    })
  }

  return (
    <DashboardLayout>
      <Grid container spacing={3} className="justify-content-center">
        <Grid item xs={12} sm={10} xl={10} className="text-center">
          <Card
            sx={{
              boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
              p: 1,
              mt: 3,
            }}
          >
            <SoftBox
              pt={2}
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <SoftBox display="flex" flexDirection="column" justifyContent="start">
                <SoftTypography variant="h6" fontWeight="medium" textAlign="left">
                  Transaction Details
                </SoftTypography>
                <SoftBox mb={1} lineHeight={0} textAlign="left">
                  <SoftTypography variant="caption" color="text" textAlign="left">
                    Code:&nbsp;
                    <SoftTypography variant="caption" fontWeight="medium">
                      {transaction.id}
                    </SoftTypography>
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
              <SoftButton variant="gradient" color="dark">
                Download
              </SoftButton>
            </SoftBox>
            <hr className="horizontal dark mt-4" />

            <Grid container spacing={0}>
              <Grid item xs={12} sm={6} xl={4}>
                <TimelineDetails onSave={handleRefound} transaction={transaction} />
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <PaymentDetails transaction={transaction} user={user}/>
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <TransactionAmount transaction={transaction} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default TransactionDetails;