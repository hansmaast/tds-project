import { gql } from '@apollo/client/core';

export const INSERT_POST = gql`
    mutation InsertPost($post: posts_insert_input!) {
        insert_posts_one(object: $post) {
            title
            description
            publicPhotoPath
            user {
                display_name
            }
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: Int!){
        delete_comments (
            where: {
                post_id: {
                    _eq: $id
                }
            }
        ) {
            affected_rows
        }
        delete_posts_by_pk (
            id: $id
        ) { id }
    }
`;
