// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import SoftBox from "components/SoftBox";
import { Button, Card, Checkbox, Grid, Tooltip } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import Table from "examples/Tables/Table";
import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getTransactions } from "apis/request";
//import { setTransactions } from "context";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import { useNavigate } from "react-router-dom";
import { getCardRequests } from "apis/request";
import { aceptCard } from "apis/request";
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import { rejectCard } from "apis/request";
import { SweetAlert } from "apis/sweetAlert";

function CardsRequests() {

  const navegate = useNavigate();
  const [update, setUpdate] = useState(1)
  const [columns2, setColumns2] = useState([
    {name: "NAME", align: "left"},
    {name: "COUNTRY", aling: "left"},
    {name: "DESCRIPTION", align: "left"},
    { name: "RECEPTIANT", align: "left" },
    { name: "ID", align: "left" },
    { name: "DATE", align: "left" },
    { name: "STATE", align: "center" },
    { name: "action", align: "center" },
  ]);
  const [rows2, setRows2] = useState([])
  const [index, setIndex] = useState(0)
  const [withdraws, setWithdraws] = useState(0);
  const [topUps, setTopUps] = useState(0);
  const [transfers, setTransfers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [requests, setRequests] = useState([{
    data: {
      id: "",
      request: "",
      state: "",
      user: {
          name: "",
          lastName: "",
          email: ""
      }
    }
  }])
  const itemsPerPage = 10;

  function AmountField({ amount }) {
    return (
      <SoftBox px={1}>
        <Checkbox />
        <SoftTypography pl={1} variant="button" fontWeight="medium">
          {amount}
        </SoftTypography>
      </SoftBox>
    );
  }

  useEffect(() => {
    async function getData () {
      getCardRequests().then(async (data) => {
        console.log(data)
        await setRequests(data);
      }).catch(error => {
        console.log(error)
      })
    }
    getData();
  }, [update])

  /*useEffect(() => {
    async function x () {
      const rows = await transactions.map((transaction) => ({
        AMOUNT: <AmountField amount={transaction.currency + " " + transaction.amount} />,
        DESCRIPTION: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.action}
          </SoftTypography>
        ),
        RECEPTIANT: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.userInteraction}
          </SoftTypography>
        ),
        ID: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.id}
          </SoftTypography>
        ),
        DATE: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {transaction.date}
          </SoftTypography>
        ),
        STATE: (
          <SoftTypography variant="caption" color={transaction.status === "success" || transaction.status === "succeeded" ? "success" : "error" } fontWeight="medium">
            {transaction.status}
          </SoftTypography>
        ),
      }))
      await setRows2(rows);
    }
    x();
  }, [controller]);*/

  useEffect(() => {
    console.log(requests)
    console.log(requests[0].data)
    const paginatedRequests = paginate(currentPage);
    const rows = paginatedRequests.map((request) => ({
      action: <Actions id={request.data.id} />,
      NAME: <AmountField amount={request.data.user.name + " " + request.data.user.lastName} />,
      DESCRIPTION: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {request.data.request}
          </SoftTypography>
      ),
      COUNTRY: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {request.data.country}
        </SoftTypography>
      ),
      RECEPTIANT: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {request.data.user.email}
          </SoftTypography>
      ),
      ID: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {request.data.id}
          </SoftTypography>
      ),
      DATE: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {request.data.date}
          </SoftTypography>
      ),
      STATE: (
          <SoftTypography variant="caption" color={request.data.state === "aproved" || request.data.state === "succeeded" ? "success" :request.data.state === "pending" ? "warning" : "error" } fontWeight="medium">
            {request.data.state}
          </SoftTypography>
      ),
    }));
    setRows2(rows);
  }, [currentPage, requests])

  function paginate(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return requests.slice(startIndex, endIndex);
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }
  
  function goToNextPage() {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  function Actions({id}) {

    const acept = () => {
      aceptCard(id).then( data => {
        console.log("test")
        navegate("/admin/card-reuqests")
        setUpdate(Math.random())
      }).catch(error => {
        if(error === 400){
          SweetAlert("warning", "Ooops", "No card for US users for the moment")
        }
        console.log(error)})
    }

    const reject = () => {
      rejectCard(id).then(data => {
        navegate("/admin/card-reuqests")
        setUpdate(Math.random())
      }).catch(error => {console.log(error)})
    }

    return (
      <SoftBox display="flex" gap={2}>
        <SoftBox onClick={() => {acept()}}>
          <Tooltip title="Aprove Card" placement="top">
            <DoneIcon />
          </Tooltip>
        </SoftBox>
        <SoftBox onClick={() => {reject()}}>
          <Tooltip title="Denied Card" placement="top">
            <CancelIcon />
          </Tooltip>
        </SoftBox>
      </SoftBox>
    );
  }

  return (
    <DashboardLayout>
      <SoftBox mb={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">All Credit Card Requests</SoftTypography>
            <SoftBox display="flex">
              <Grid item ml={2}>
                  <Button variant="contained" color="primary" onClick={goToPreviousPage}>
                    Previus Page
                  </Button>
                </Grid>
                <Grid item ml={2} mt={1}>
                  <SoftTypography variant="h6"> {currentPage} </SoftTypography>
                </Grid>
                <Grid item ml={2}>
                  <Button variant="contained" color="secondary" onClick={goToNextPage}>
                    Next Page
                  </Button>
                </Grid>
            </SoftBox>
          </SoftBox>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            <Table
              columns={columns2}
              rows={rows2.map((item) => ({ ...item }))}
            />
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default CardsRequests;