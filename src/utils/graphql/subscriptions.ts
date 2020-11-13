import { gql } from '@apollo/client/core';

const SUBSCRIBE_POSTS = gql`
    subscription {
        posts {
            id
            title
            description
            publicPhotoPath
            user {
                id
                display_name
            }
        }
    }`;

export default SUBSCRIBE_POSTS;
