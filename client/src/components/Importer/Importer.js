import React from "react";
import { FileUpload } from "primereact/fileupload";

class Importer extends React.Component {
  render() {
    return (
      <FileUpload
        ref={this.props.uploadBoxref}
        accept=".csv"
        name="demo"
        url="./upload"
        mode="basic"
        chooseLabel="Import"
        auto={true}
        customUpload
        uploadHandler={(event) => this.props.myUploader(event)}
        {...this.props}
      ></FileUpload>
    );
  }
}

export default Importer;
