import { IonCardSubtitle, IonList } from '@ionic/react';
import React from 'react';
import { useQuery } from '@apollo/client';
import Comment from './Comment';
import { SkeletonComment } from './SkelteonComment';
import { GET_POST_COMMENTS } from '../graphql/queries';
import IComment from '../types';

interface Props {
  postId: number
}

const CommentsContainer: React.FC<Props> = ({ postId }) => {
  const { loading, error, data } = useQuery(GET_POST_COMMENTS, {
    variables: { postId },
  });

  if (error) {
    return <div style={{ margin: 'auto 0' }}>{error}</div>;
  }

  if (loading) {
    return (
      <>
        <SkeletonComment />
      </>
    );
  }

  const subtitle = data?.comments.length === 0 ? 'There are noe comments...' : 'Comments';

  return (
    <div style={{
      maxWidth: 748,
      padding: 16,
    }}
    >
      <IonCardSubtitle>
        {' '}
        {subtitle}
        {' '}
      </IonCardSubtitle>
      <IonList lines="none">
        {
          data?.comments.map((comment: IComment) => <Comment key={comment.id} comment={comment} />)
        }
      </IonList>
    </div>
  );
};

export default CommentsContainer;
