import {IonCard, IonCardContent, IonCardSubtitle, IonList} from "@ionic/react";
import React from "react";
import Comment from '../components/Comment';
import {useQuery} from "@apollo/client";
import {SkeletonComment} from "../components/skeletons/SkelteonComment";
import {GET_POST_COMMENTS} from "../graphql/queries/queries";
import IComment from "../interfaces/IComment";

interface Props {
  postId: number
}

const CommentsContainer: React.FC<Props> = ({postId}) => {

  const {loading, error, data} = useQuery(GET_POST_COMMENTS, {
    variables: {postId}
  });

  if (error) {
    return <div style={{margin: 'auto 0'}}>{error}</div>
  }

  if (loading) {
    return (
        <>
          <SkeletonComment/>
        </>
    );
  }

  const subtitle = data?.comments.length < 1 ? 'There are noe comments...' : 'Comments';

  return (
        <div style={{
          maxWidth: 748,
          padding: 16
        }}>
          <IonCardSubtitle> {subtitle} </IonCardSubtitle>
          <IonList lines={"none"}>
            {
              data?.comments.map((comment: IComment) => <Comment key={comment.id} comment={comment}/>)
            }
          </IonList>
        </div>
  )
}

export default CommentsContainer;