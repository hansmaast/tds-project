import {gql} from "@apollo/client/core";

export const GET_POSTS = gql`
    query {
        posts {
            id
            title
            description
            user {

                display_name
            }
        }
    }
`;

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