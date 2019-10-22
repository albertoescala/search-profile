import React from 'react';
import { useData, useDataDispatch } from '../components/Data';
import { Layout, List } from '../components';
import fetchWrapper from '../utils/fetchWrapper';
import { LOADING, USERS } from '../utils/constants';
import { Input, message } from 'antd';

const { Search } = Input;

const SearchPage: React.FunctionComponent = () => {
  const {
    usersList,
    loading
  } = useData();
  const dispatch = useDataDispatch();

  return (
    <Layout title="GPC-SearchPage">
      <h1>Search Github Profile</h1>
      <Search
        disabled={loading}
        placeholder="Search by username"
        onSearch={async value => {
          try {
            dispatch({type: LOADING, data: true})
            const res: {
              items: {
                id: number
                login: string
              }[]
            } = await fetchWrapper(
              `https://api.github.com/search/users?q=${value}`
            );
            dispatch({type: USERS, data: res.items})
          } catch {
            message.error('Ops! Something went wrong, please try again')
          } finally {
            dispatch({type: LOADING, loading: false})
          }
        }}
        style={{ width: 500, marginBottom: '20px' }}
      />
      {usersList.length > 0 && <List loading={loading} items={usersList} hasAction={false} />}
    </Layout>
  );
};

export default SearchPage;
