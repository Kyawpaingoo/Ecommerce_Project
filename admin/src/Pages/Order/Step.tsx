import React from "react";
import { Cancel, CheckCircle, DoneAll, Inventory, LocalShipping } from '@mui/icons-material';

interface IStepData {
    label: string;
    description: string;
    icon: JSX.Element;
    color: string;
  }
export const steps: IStepData[] = [
    {
        label: 'Order Received',
        description: 'This initial step indicates that the order has been successfully placed and received by the system. The processing of the order will begin shortly.',
        icon: <CheckCircle />,
        color: '#4caf50',
    },
    {
        label: 'Order Packing',
        description: 'This step indicates that the order is being packed and prepared for shipment. All items in the order are being gathered and securely packaged.',
        icon: <Inventory />,
        color: '#ff9800',
    },
    {
        label: 'On Delivery',
        description: 'This step shows that the order has been shipped and is currently in transit to the delivery address. The customer can expect the order to arrive soon.',
        icon: <LocalShipping />,
        color: '#2196f3',
    },
    {
        label: 'Order Arrived',
        description: 'This final step signifies that the order has been delivered and successfully received by the customer. The process is now complete.',
        icon: <DoneAll />,
        color: '#388e3c',
    },
    {
        label: 'Order Cancel',
        description: 'This step indicates that the order has been canceled. This could be due to customer request or other reasons. No further actions will be taken on this order.',
        icon: <Cancel />,
        color: '#f44336',
    },
];

// Cancel: TThis step indicates that the order has been canceled. This could be due to customer request or other reasons. No further actions will be taken on this order.