import React from 'react';
import logo from 'src/assets/logo-joyfa.svg';

export interface JoyfaLogoProps {
  width: string;
  height: string;
}

const JoyfaLogo: React.FC<JoyfaLogoProps> = (props) => {
  return (
    <img alt="joyfa" width={props.width} height={props.height} src={logo} />
  );
};

export default JoyfaLogo;
