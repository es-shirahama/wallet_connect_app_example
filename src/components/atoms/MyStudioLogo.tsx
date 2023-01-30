import React from 'react';
import logo from 'src/assets/logo-mystudio.png';

export interface JoyfaLogoProps {
  width: string;
  height: string;
}

const MyStudioLogo: React.FC<JoyfaLogoProps> = (props) => {
  return (
    <img alt="mystudio" width={props.width} height={props.height} src={logo} />
  );
};

export default MyStudioLogo;
