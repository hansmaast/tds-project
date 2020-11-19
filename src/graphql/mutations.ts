import { gql } from '@apollo/client/core';

export const INSERT_HIKE = gql`
    mutation InsertHike($hike: hikes_insert_input!) {
            insert_hikes_one(object: $hike) {
                title
                description
                start_point
                end_point
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
