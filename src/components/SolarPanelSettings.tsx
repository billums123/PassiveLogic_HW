import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputAdornment,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { SolarPower as SolarPowerIcon } from "@mui/icons-material";
import formControl from "../utils/formControl";
import {
  FormValues,
  GlobalFormErrors,
  SetGlobalFormErrors,
  SolarPanelSettingsErrors,
} from "../types";
import "../stylesheets/solar-panel-settings.css";
import { useEffect, useState } from "react";

interface SolarPanelSettingsProps {
  formValues: FormValues;
  handleFormChange: (event: any) => void;
  globalFormErrors: GlobalFormErrors;
  handleSetGlobalFormErrors: ({ name, error }: SetGlobalFormErrors) => void;
}
const SolarPanelSettings = ({
  formValues,
  handleFormChange,
  globalFormErrors,
  handleSetGlobalFormErrors,
}: SolarPanelSettingsProps) => {
  const {
    shapeOfPanel,
    panelWidth,
    panelLength,
    panelDiameter,
    panelEfficiency,
    solarFlux,
  } = formValues;

  const [solarPanelFormErrors, setSolarPanelFormErrors] =
    useState<SolarPanelSettingsErrors>({
      shapeOfPanelError: "",
      panelWidthError: "",
      panelLengthError: "",
      panelDiameterError: "",
      panelEfficiencyError: "error",
      solarFluxError: "error",
    });

  const handleCheckIfAnyErrorsExist = () => {
    const errorsExist = Object.values(solarPanelFormErrors).some(
      (formError) => formError.length
    );
    errorsExist
      ? handleSetGlobalFormErrors({
          name: "solarPanelSettingsErrors",
          error: true,
        })
      : handleSetGlobalFormErrors({
          name: "solarPanelSettingsErrors",
          error: false,
        });
  };

  const handleSetSolarPanelFormErrors = (errors: SolarPanelSettingsErrors) => {
    setSolarPanelFormErrors(errors);
    return;
  };

  useEffect(() => {
    formControl.solarPanelSettings(
      {
        shapeOfPanel,
        panelWidth,
        panelLength,
        panelDiameter,
        panelEfficiency,
        solarFlux,
      },
      handleSetSolarPanelFormErrors
    );
  }, [
    shapeOfPanel,
    panelWidth,
    panelLength,
    panelDiameter,
    panelEfficiency,
    solarFlux,
  ]);

  useEffect(() => {
    handleCheckIfAnyErrorsExist();
  }, [solarPanelFormErrors]);
  return (
    <>
      <Accordion className="solar-panel-settings">
        <AccordionSummary
          expandIcon={<SolarPowerIcon sx={{ color: "secondary.main" }} />}
          sx={{
            bgcolor: globalFormErrors.solarPanelSettingsErrors
              ? "error.main"
              : "success.main",

            ":hover": {
              bgcolor: globalFormErrors.solarPanelSettingsErrors
                ? "error.light"
                : "success.light",
            },
            ":focus": {
              bgcolor: globalFormErrors.solarPanelSettingsErrors
                ? "error.light"
                : "success.light",
            },
          }}
        >
          <Typography>Solar Panel Settings</Typography>
        </AccordionSummary>
        <AccordionDetails className="solar-panel-details">
          <FormControl fullWidth>
            <InputLabel id="shape-label">Shape of Solar Panel</InputLabel>
            <Select
              labelId="shape-label"
              name="shapeOfPanel"
              value={shapeOfPanel}
              label="Shape of Solar Panel"
              onChange={handleFormChange}
            >
              <MenuItem value="rectangle">Rectangle</MenuItem>
              <MenuItem value="circle">Circle</MenuItem>
            </Select>
          </FormControl>
          {shapeOfPanel === "rectangle" ? (
            <>
              <Box component="div" sx={{ display: "flex" }}>
                <TextField
                  name="panelWidth"
                  label="Width"
                  type="number"
                  value={panelWidth}
                  error={solarPanelFormErrors.panelWidthError.length > 0}
                  helperText={solarPanelFormErrors.panelWidthError}
                  sx={{ flex: 1 }}
                  onChange={handleFormChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">m</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="panelLength"
                  label="Length"
                  type="number"
                  value={panelLength}
                  error={solarPanelFormErrors.panelLengthError.length > 0}
                  helperText={solarPanelFormErrors.panelLengthError}
                  sx={{ flex: 1 }}
                  onChange={handleFormChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">m</InputAdornment>
                    ),
                  }}
                />
              </Box>
            </>
          ) : (
            <TextField
              name="panelDiameter"
              label="Diameter"
              type="number"
              value={panelDiameter}
              onChange={handleFormChange}
              error={solarPanelFormErrors.panelDiameterError.length > 0}
              helperText={solarPanelFormErrors.panelDiameterError}
              sx={{ width: "100%" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              }}
            />
          )}
          <TextField
            variant="standard"
            name="solarPanelArea"
            label="Solar Panel Surface Area"
            disabled
            value={(shapeOfPanel === "rectangle"
              ? panelWidth * panelLength
              : Math.PI * Math.pow(panelDiameter / 2, 2)
            ).toFixed(2)}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span>
                    m<sup>2</sup>
                  </span>
                </InputAdornment>
              ),
              readOnly: true,
            }}
          />
          <TextField
            name="solarFlux"
            label="Solar Flux"
            type="number"
            value={solarFlux ? solarFlux : ""}
            onChange={handleFormChange}
            error={solarPanelFormErrors.solarFluxError.length > 0}
            helperText={solarPanelFormErrors.solarFluxError}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {" "}
                  <span>
                    W/m<sup>2</sup>
                  </span>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="panelEfficiency"
            label="Panel Efficiency"
            type="number"
            value={panelEfficiency ? panelEfficiency : ""}
            onChange={handleFormChange}
            error={solarPanelFormErrors.panelEfficiencyError.length > 0}
            helperText={solarPanelFormErrors.panelEfficiencyError}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SolarPanelSettings;
