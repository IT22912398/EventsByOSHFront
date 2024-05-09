import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip,Legend);

const LineChartModal = ({ open, handleClose, dataa }) => {
  const newArray = [];

  const placeBudget = dataa?.placeAbudget + dataa?.placePbudget;
  const crewBudget = dataa?.crewAbudget + dataa?.crewPbudget;
  const promoBudget = dataa?.promoAbudget + dataa?.promoPbudget;
  const fullBudget = dataa?.fullBudget;

  newArray.push(placeBudget, crewBudget, promoBudget, fullBudget);

  const data = {
    labels: ['PlaceBudget', 'CrewBudget', 'PromoBudget', 'FullBudget'],
    datasets: [{
      label: 'Budget',
      data: newArray,
      backgroundColor: 'aqua',
      borderColor: 'black',
      pointBorderColor: 'black',
      fill: true
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart'
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Line Chart
        </Typography>
        <Line data={data} options={options} />
      </Box>
    </Modal>
  );
};

export default LineChartModal;
