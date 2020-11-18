import { gql } from '@apollo/client/core';

export const SUBSCRIBE_HIKES = gql`
    subscription {
        hikes {
            id
            title
            description
            publicPhotoPath
            user {
                id
                display_name
            }
            length
            start_point
            end_point
            comments {
                id
                text
                post_id
                user {
                    display_name
                }
            }
        }
    }`;
