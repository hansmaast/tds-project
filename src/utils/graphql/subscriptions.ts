import { gql } from '@apollo/client/core';

const SUBSCRIBE_HIKES = gql`
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

export default SUBSCRIBE_HIKES;
