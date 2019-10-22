import React, { Fragment } from 'react';
import Link from 'next/link';
import { Button } from 'antd';

const Home: React.FunctionComponent = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h1>Github Clone</h1>
      <Link href="/login">
        <Button type="primary">Login</Button>
      </Link>
    </div>
  );
};

export default Home;
