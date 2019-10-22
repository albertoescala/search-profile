import React from 'react';
import Link from 'next/link'
import {
  List as ListContainer,
  Avatar,
  Icon
} from 'antd';

type Props = {
  items?: {
    id?: number
    login?: string
    description?: string
    avatar_url?: string
    name?: string
    title?: string
    actions?: any
  }[]
  hasAction: boolean
  loading?: boolean
}

const IconText = ({ type = '', text = '' }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const List: React.FunctionComponent<Props> = ({ items = [], hasAction, loading }) => {
  return (
    <ListContainer
      itemLayout="horizontal"
      size="large"
      dataSource={items}
      loading={loading}
      renderItem={item => (
        <ListContainer.Item
          key={item.id}
          actions={hasAction ? item.actions.map((action: {
            type: string
            text: string
          }) => (
            <IconText type={action.type} text={action.text} key="list-vertical-star-o" />
          )) : []}
        >
          <ListContainer.Item.Meta
            avatar={item.avatar_url && <Avatar src={item.avatar_url} />}
            title={item.login ? (
              <Link href="/profile?user=[id]" as={`/profile?user=${item.login}`}>
                <a>
                  {item.login}
                </a>
              </Link>
            ) : item.title}
            description={item.description}
          />
        </ListContainer.Item>
      )}
    />
  )
}

export default List