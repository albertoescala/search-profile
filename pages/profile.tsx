import { NextPage } from 'next';
import {
  Avatar,
  IconWithText,
  Layout,
  Repos
} from '../components';
import fetchWrapper from '../utils/fetchWrapper';
import moment from 'moment';

type Props = {
  data: {
    id: number
    login: string
    avatar_url: string
    name: string
    location: string
    created_at: string
  }
  username: string
}

const Profile: NextPage<Props> = ({ data, username }) => {
  return (
    <Layout title="GPC-Profile">
      <h1>{data.name}'s profile</h1>
      <div
        style={({ display: 'flex', alignItems: 'center' })}
      >
        <Avatar img={data.avatar_url} username={username} name={data.name} />
        <div style={({ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' })}>
          <IconWithText text={data.name} type="smile" color="#1790ff"/>
          <IconWithText text={data.login} type="check-circle" color="#52c41a"/>
          <IconWithText text={data.location} type="home" color="#eb2f96" />
          <IconWithText text={`Joined ${moment(data.created_at).fromNow()}`} type="fire" color="#c3c3c3" />
        </div>
      </div>
      <Repos username={username} />
    </Layout>
  )
};

Profile.getInitialProps = async ({ asPath = '' }) => {
  const username = asPath.slice(asPath.indexOf("=") + 1);

  const data: {
    id: number
    login: string
    avatar_url: string
    name: string
    location: string
    created_at: string
  } = await fetchWrapper(
    `https://api.github.com/users/${username}`
  )

  return { data, username }
}

export default Profile;