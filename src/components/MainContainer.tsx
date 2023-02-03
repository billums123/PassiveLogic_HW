import { useState } from "react";
import { Box, Fab } from "@mui/material";
import CanvasContainer from "./CanvasContainer";
import InputsContainer from "./InputsContainer";
import "../stylesheets/main-container.css";
import { FormValues, HeatTransferResults, SimulationStatus } from "../types";
import heatTransferCalcs from "../utils/heatTransferCalcs";
import ResultsModal from "./ResultsModal";

const startingFormValues: FormValues = {
  shapeOfPanel: "rectangle",
  panelWidth: 1,
  panelLength: 1,
  panelDiameter: 1,
  panelEfficiency: null,
  solarFlux: 1000,
  storageTankThermalConductivity: 0.5,
  storageTankHeight: 1,
  storageTankDiameter: 1,
  fluidInitTemp: 20,
  fluidFinalTemp: null,
  numberOfIncrements: null,
};

const MainContainer = () => {
  const [simulationStatus, setSimulationStatus] = useState<SimulationStatus>({
    status: "waiting",
  });
  const [resultsModalOpen, setResultsModalOpen] = useState(false);

  const [heatTransferResults, setHeatTransferResults] =
    useState<HeatTransferResults>({
      calculationComplete: false,
      panelSurfaceArea: null,
      storageTankCapacity: null,
      solarPanelEnergyInput: null,
      energyRequiredToHeatTankFluid: null,
      requiredTime: null,
    });

  const [formValues, setFormValues] = useState(startingFormValues);

  const handleFormChange = (e: any) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleRunSimulation = () => {
    setSimulationStatus({ status: "inProgress" });
    const results = heatTransferCalcs(formValues);

    //This setTimeout is currently meant to replicate what would happen if a more computationally intensive simulation was ran.
    setTimeout(() => {
      setSimulationStatus({ status: "complete" });
      setHeatTransferResults(results);
    }, 1000);
  };

  const handleOpenResultsModal = () => {
    setResultsModalOpen(true);
  };

  const handleCloseResultsModal = () => {
    setResultsModalOpen(false);
  };

  const handleResetSimulation = () => {
    setSimulationStatus({ status: "waiting" });
    setFormValues(startingFormValues);
  };

  return (
    <Box component="div" className="main-container">
      <InputsContainer
        formValues={formValues}
        handleFormChange={handleFormChange}
        handleRunSimulation={handleRunSimulation}
        simulationStatus={simulationStatus}
        handleOpenResultsModal={handleOpenResultsModal}
        handleResetSimulation={handleResetSimulation}
      />
      <ResultsModal
        resultsModalOpen={resultsModalOpen}
        handleCloseResultsModal={handleCloseResultsModal}
        formValues={formValues}
        heatTransferResults={heatTransferResults}
      />

      <CanvasContainer formValues={formValues} />
    </Box>
  );
};

export default MainContainer;
