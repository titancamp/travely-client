import React from 'react';

export default class LogoUpload extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      logo: undefined,
    };
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.file !== prevProps.file)
    {
      this.setState(() => {
        let reader = new FileReader();

        reader.onloadend = () => {
          this.setState({logo: reader.result });
        };

        reader.readAsDataURL(this.props.file);
      });
    }
  }
  
    render() {
      const { file } = this.props;
      const { logo } = this.state;
  
      if (!file) { return null; }
  
      return (<img src={logo}
        alt={file.name}
        height={250}
        width='100%' />);
    }
  }