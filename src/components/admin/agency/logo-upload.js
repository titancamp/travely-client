import React from "react";
import FileClient from "../../../api/file-client";

export default class LogoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: undefined,
    };
    console.log("logo-upload:", props);
    this.downloadLogo = this.downloadLogo.bind(this);
    this.downloadLogo(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.file !== prevProps.file) {
      this.setState(() => {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState({ logo: reader.result });
        };

        reader.readAsDataURL(this.props.file);
      });
    }
  }

  async downloadLogo(props){
    if(props.agencyId && props.logoId){ 
      await FileClient.download(props.agencyId, props.logoId)
      .then((response)=>{
        if(response.data.status){
          const logo = new Blob([response.data.data], {type: "base64"});
          console.log("blob: ", logo);
          this.setState({logo});
        }
      })
      .catch((error)=>{
        // TODO: Add error message
      });
    }
  }

  render() {
    const { file } = this.props;
    const { logo } = this.state;

    if (!file) {
      return null;
    }

    return <img src={logo} alt={file.name} height={250} width="100%" />;
  }
}
