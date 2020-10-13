import { gql } from '@apollo/client/core';

const GET_POST_COMMENTS = gql`
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

export default GET_POST_COMMENTS;
