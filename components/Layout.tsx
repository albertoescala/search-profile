import * as React from 'react'
import Head from 'next/head'

type Props = {
  title: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title,
}) => (
  <div style={({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '768px',
    margin: 'auto'
  })}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </div>
)

export default Layout