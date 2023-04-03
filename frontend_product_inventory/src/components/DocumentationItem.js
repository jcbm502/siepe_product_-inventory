import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Divider,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

export const DocumentationItem = () => {
  const { id } = useParams();
  const source = `
  [[_TOC_]]
  # Database Objects
  
  ##Row Database Validations
  
  Create the stored procedure for the row DB validations **(Must have the same name as the one configured on the AdminTools)**. If a stored procedure is not provided the file will be Delivered and sent to the PubSub.
  * The stored procedure should accept a Parameter for **every** Column in the CSV file as nvarchar(255)
  * If the stored procedure returns any message, it will considered as a validation error.
  * Any failure will result in the file not being passed through into the filesystem
  * The special characters on the columns will be removed when sending stored procedure parameters.  For a column with then name \`Ledger Level/2\` the parameter will be sent as \`LedgerLevel2\`.
  ##File Database Validations
  Create the stored procedure for the file DB validations **(Must have the same as the one configured on the AdminTools)**.
  
  - The stored proc should accept a Parameter called **@File** of type **XML** that will contain all of the file rows with the following structure:
  
  ![image.png](http://localhost:1337/uploads/tec1_f7e0042fba.png)
  - If the stored procedure returns any message, it will considered as a validation error.
  - Any failure will result in the file not being passed through into the filesystem.
  - The special characters on the columns will be removed on the XML generated.  For a column with then name \`Ledger Level/2\` the XML will be sent as \`<LedgerLevel2>Value</LedgerLevel2>\`.
  ##Status Poll Stored Procedure
  To poll the status and progress of the file uploaded a stored procedure with the following requirements needs to be created: 
  - The name must be **MappingUpload.pFileUploadPollStatusXml**  
  - It must receive a parameter called **PollRequest** of type **XML**
  - Example of parameter data:
  
  ![image.png](http://localhost:1337/uploads/tec2_6a6b810fc5.png)
  - It must return an **XML array** that matches the following structure: 
  
  ![image.png](http://localhost:1337/uploads/tec4_d5c1bf9a75.png)
  - The Result tag should have one of the following values: \`Pending, Inactive, Fail, Rejected, Pass, In Progress\`
  # Configuration
  
  ##Dynamic Reports
  Create a dynamic report for the file schema.
  
  ## Admin Tools
  Go to the Admin Tools site.
  1. Click on editors and then on the Configuration option. 
  ![image.png](http://localhost:1337/uploads/tec5_abd07ce635.png)
  2. Create a new configuration, **the name should be FileUploadConfiguration** and select the **FileUpload.Configuration.FileUploadConfiguration** type
  ![image.png](http://localhost:1337/uploads/tec6_d8d2597fea.png)
  3. Set the configuration for all of the file upload configuration needed.
  ![image.png](http://localhost:1337/uploads/tec7_1a07e98b8e.png)
  4. Here is a description of all of the properties:
  
      | Field | Description |
      |--|--|
      |DisplayName  |  The name displayed on the Download Template button|
      |FileType  | The type of the file to be configure, this field is used on the file delivery and   pubsub. |
      |IsTemplateAvailable  | Determines if the type will have a template to be downloaded |
      |ReportId | The ID of the dynamic report that will contain the template, **if the report ID is equal to 0 the schema validation is omitted**|
      |StoredProcedureName| The name of the stored procedure to be called for the row by row DB validations, **if the stored procedure is not provided the validations are omitted**|
      |FileStoredProcedureName| The name of the stored procedure to be called for the whole file DB validations, **if the stored procedure is not provided the validations are omitted**|
      |AllowMultipleUploads| Determines if the user can upload more than one file on the Portal|
  
  ## PubSub
  Pubsub subject is sent based on the FileType  configured in the AdminTools.
   \`Example: FileUpload.{FileType}\`
  
  ##Delivery
  The Delivery configuration name on the admin tools must be: \`FileUpload.{FileType}\`.
  
  # Common Issues
  
  - The file upload module is on the following route: \`{portal.url}/file-upload\`
  - **FileUpload.Configuration.FileUploadConfiguration** DLL not found on admin tools configuration. 
  Go to this [file](https://siepe.visualstudio.com/Siepe.Software/_git/Git.Trunk?version=GBdevelopment&path=/Microservices/FileUpload/FileUpload.Configuration/FileUploadConfiguration.cs) and generate a build on the FileUpload.Configuration project and then move the DLL generated to this route \`\\{client server}\Siepe\ConfigurationDLLs\` on the client server.
  - The file upload microservice can be found [here](https://siepe.visualstudio.com/Siepe.Software/_git/Git.Trunk?version=GBdevelopment&path=/Microservices/FileUpload/FileUpload.sln) 
`;
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#1B2857" }}>
        <Toolbar>
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            Siepe product inventory - Documentation {id}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <br />
      <Container>
        <MarkdownPreview
          source={source}
          wrapperElement={{ "data-color-mode": "light" }}
        />
      </Container>
      <div style={{ padding: 80 }}></div>
    </div>
  );
};
