import React, { useEffect } from 'react';
import fetchWrapper from '../utils/fetchWrapper';
import List from '../components/List';
import { Input, message } from 'antd';
import { useData, useDataDispatch } from './Data';
import { LOADING, USER_REPOS } from '../utils/constants';

const { Search } = Input;

type Props = {
  username: string
}

const formater = (response: []) => {
  return response.map((repo: {
    id: number
    name: string
    stargazers_count: number
    forks: number
    watchers: number
  }) => ({
    id: repo.id,
    title: repo.name,
    actions: [
      { type: 'star', text: repo.stargazers_count },
      { type: 'fork', text: repo.forks },
      { type: 'eye', text: repo.watchers }
    ]
  }))
}

const Repos: React.FunctionComponent<Props> = ({ username }) => {
  const {
    userRepos,
    loading
  } = useData();
  const dispatch = useDataDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: LOADING, data: true });
        const response = await fetchWrapper(
          `https://api.github.com/users/${username}/repos`
        )
        dispatch({ type: USER_REPOS, data: formater(response) })
      } catch (error) {
        message.error('Ops! Something went wrong')
      } finally {
        dispatch({ type: LOADING, data: false });
      }
    })()
  }, []);

  return (
    <div style={({ marginTop: '20px' })}>
      <h2>Repositories</h2>
      <Search
        disabled={loading}
        placeholder="Search repositories"
        onSearch={async value => {
          try {
            dispatch({type: LOADING, data: true})
            const response = await fetchWrapper(
              `https://api.github.com/search/repositories?q=${value}+user:${username}`
            );
            dispatch({type: USER_REPOS, data: formater(response.items)})
          } catch {
            message.error('Ops! Something went wrong, please try again')
          } finally {
            dispatch({type: LOADING, loading: false})
          }
        }}
        style={{ width: 500, marginBottom: '20px' }}
      />
      <div style={({ border: '1px solid #e8e8e8', borderRadius: '2px', padding: '0px 15px' })} >
        <List loading={loading} items={userRepos} hasAction />
      </div>
    </div>
  )
};

export default Repos;