import { gql } from '@apollo/client/core';

export const GET_POST_COMMENTS = gql`
    query Comment($postId: Int!){
        comments(where: {post_id: {_eq: $postId}}) {
            id
            text
            post_id
            user {
                display_name
            }
        }
    }
`;

export const GET_HIKE_BY_ID = gql`
    query GetHikeById($id: Int!) {
        hikes(where: {id: {_eq: $id} }) {
            id
            title
            description
            publicPhotoPath
            length
            coordinates {
                hike_id
                lng_lat
                index
            }
            user {
                id
                display_name
                avatar_url
            }
        }
    }
`;
