import App from 'next/app';
import { DataProvider } from '../components/Data';

import 'antd/dist/antd.css';

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    )
  }
}

export default MyApp;