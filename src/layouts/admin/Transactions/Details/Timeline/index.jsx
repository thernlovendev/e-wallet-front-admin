import { refoundTransaction } from "apis/request";
import { SweetAlert } from "apis/sweetAlert";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import TimelineItem from "examples/Timeline/TimelineItem";
import { useEffect } from "react";

function TimelineDetails({transaction, onSave}) {

    useEffect(() => {

    },[transaction])

    const handleRefound = () => {
        onSave();
    }

    return (<>
        <SoftBox pt={3} px={3}>
            <SoftTypography variant="h6" fontWeight="medium" textAlign="left">
                Track order
            </SoftTypography>
        </SoftBox>
        <SoftBox p={2} textAlign="left">
            <TimelineItem
                color="dark"
                icon="notifications"
                title="Transaction Started"
                dateTime={transaction.date}
            />
            <TimelineItem
                color="error"
                icon="inventory_2"
                title={"Generate transaction id #" + transaction.id}
                dateTime={transaction.date}
            />
            <TimelineItem
                color="info"
                icon="shopping_cart"
                title="Payment Sent"
                dateTime={transaction.date}
            />
            <TimelineItem
                color="success"
                icon="payment"
                title="Transaction Completed"
                dateTime={transaction.date}
            />
{transaction.action === "charge" || transaction.action === "transfer" ? <SoftButton variant="gradient" color="error" onClick={handleRefound} >
                Refound
            </SoftButton> : <></>}
        </SoftBox>
    </>
    );
}

export default TimelineDetails;