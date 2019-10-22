import React, { Fragment } from 'react';
import Link from 'next/link';
import { Button } from 'antd';

const Home: React.FunctionComponent = () => {
  return (
    <Fragment>
      <h1>Github Clone</h1>
      <Link href="/login">
        <Button type="primary">Login</Button>
      </Link>
    </Fragment>
  );
};

export default Home;
