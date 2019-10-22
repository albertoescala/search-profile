import React from 'react';
import { Icon } from 'antd';

type Props = {
  text: string
  type: string
  color: string
}

const IconWithText: React.FunctionComponent<Props> = ({ text, type, color }) => {
  return (
    <div style={{ marginLeft: '5px' }}>
      <Icon style={{ fontSize: '24px' }} type={type} theme="twoTone" twoToneColor={color} />
      <span style={{ fontSize: '20px', marginLeft: '10px' }}>{text}</span>
    </div>
  );
}

export default IconWithText;