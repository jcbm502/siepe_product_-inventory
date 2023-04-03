import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Divider,
  Grid,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFeatures } from "../service/ProductService";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const FeatureItem = () => {
  const source = `
  [[_TOC_]]

#Related Epics
*  #1416

# Download Template
##Description
Download a template with the schema expected on a specific file upload type.

**This only works with csv files.**
## How to use
On the file upload page, click on the Download Template dropdown and the list of configured templates available for download will be displayed.


A file with the schema expected will be downloaded.


![image.png](http://localhost:1337/uploads/schema_1_bb0540e8eb.png)


# File Upload
##Description
Upload a file to be validated with an schema validation and a stored procedure that is executed on each row **(only on csv files)** and then Delivered and sent through the PubSub to be processed.
##How to use 
To select a file you can drag it from the file explorer or click on the Browse Files button.

After the file is selected, you need to select an upload type to be able to upload the file.

![image.png](http://localhost:1337/uploads/schema_2_8ac448d88b.png)

When a file is uploaded, a panel with the results is displayed, either with an error (Schema Validation, wrong file extension, DB Validation) or with the list of steps that will be executed with the uploaded file.

**If you leave this page, while a file is still being processed you will not be able to see the results again.**

![image.png](http://localhost:1337/uploads/schema_3_240f4bea92.png)

Row by Row validation runs over each line of the file (only for CSV files) and fails if any of the configured criteria is set. If the Status is FAIL then the file is **not** passed on the backend file system.


![image.png](http://localhost:1337/uploads/thumbnail_schema_4_26944da4f8.png)

`;

  const { id } = useParams();
  const location = useLocation();
  const [markDownTxt, setMarkDownTxt] = useState();
  const initialValue = [];
  const data = location.state;
  useEffect(() => {
    getDataFeatures();
  }, []);

  const getDataFeatures = async () => {
    const { data } = await getFeatures();
    console.log("res features ", data[0].attributes.data);
  };

  const handleAddFeature = () => {};
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#1B2857" }}>
        <Toolbar>
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            Siepe product inventory - Feature
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <br />
      {/* {data != undefined ? (
        data[0] != undefined &&
        data[0].attributes != undefined && (
          <Container fixed>
            <MarkdownPreview
              source={data[0].attributes.data}
              wrapperElement={{ "data-color-mode": "light" }}
            />
          </Container>
        )
      ) : ( */}
      {/* )} */}
      <Container>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFeature}
          >
            Create
          </Button>
        </Grid>
        <br />
        <Editor
          editorState={markDownTxt}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={setMarkDownTxt}
        />
      </Container>
      ;
    </div>
  );
};
