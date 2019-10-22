import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

type Props = {
  img?: string
  username: string
  name: string
}

const Avatar: React.FunctionComponent<Props> = ({ img, username, name }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={img} />}
    >
      <Meta title={name} description={username} />
    </Card>
  );
}

export default Avatar;