import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import React from "react";
import {Link} from "react-router-dom";
import {IPost} from "../interfaces/IPost";

interface Props {
  post: IPost
}

const PostCard: React.FC<Props> = ({post}) => {

  const {id, user, title, description } = post;

  return (
      <Link style={{textDecoration: 'none'}}
            to={{
              pathname: `details/${id}`,
              state: {
                post: post
              }
            }}>
        <IonCard>
          <img src={''} alt=""/>
          <IonCardHeader>
            <IonCardSubtitle>
              @ {user.display_name}
            </IonCardSubtitle>
            <IonCardTitle>
              {title}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {description}
          </IonCardContent>
        </IonCard>
      </Link>
  );
};

export default PostCard;