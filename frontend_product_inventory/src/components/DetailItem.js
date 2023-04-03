import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { Assignment as PersonIcon } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Grid,
} from "@material-ui/core";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Divider,
} from "@material-ui/core";
import { ResumeDetail } from "./ResumeDetail";

export const DetailItem = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [dataParent, setDataParent] = useState();
  useEffect(() => {
    console.log(data.attributes);
    setDataParent(data.attributes);
  }, []);

  const resume = {
    techLeader: "John Doe",
    proManager: "johndoe@example.com",
  };

  const handleFeature = () => {
    navigate("/feature/1", { state: dataParent.feature });
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#1B2857" }}>
        <Toolbar>
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            Siepe product inventory - detail {id}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <h1>File Upload Document</h1>
        <div>
          {dataParent !== undefined && (
            <Table style={{ border: "0", width: "50%" }}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Container>
                      <Typography variant="subtitle1" color="textSecondary">
                        Area
                      </Typography>
                    </Container>
                  </TableCell>
                  <TableCell>
                    {dataParent.area.data.attributes.areaName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" color="textSecondary">
                      Synopsis
                    </Typography>
                  </TableCell>
                  <TableCell>{dataParent.synopsis}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          <Divider />
          {dataParent !== undefined && (
            <>
              <ResumeDetail
                title="Technical Leader"
                value={dataParent.technicalLeader}
              />
              <ResumeDetail
                title="Product Manager"
                value={dataParent.productManager}
              />
            </>
          )}
          <br />
          <Divider />
          <div>
            <Grid>
              <IconButton
                component={RouterLink}
                to="/feature/1"
                aria-label="Feature"
                color="inherit"
                style={{ fontSize: 16, padding: 8 }}
                onClick={handleFeature}
              >
                <PersonIcon />
                Feature
              </IconButton>
            </Grid>
            <Grid>
              <IconButton
                component={RouterLink}
                to="/documentation/2"
                aria-label="Technical"
                color="inherit"
                style={{ fontSize: 16, padding: 8 }}
              >
                <PersonIcon />
                Technical documentation
              </IconButton>
            </Grid>
          </div>
        </div>
      </Container>
    </div>
  );
};
