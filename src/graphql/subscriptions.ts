import { gql } from '@apollo/client/core';

export const SUBSCRIBE_HIKES = gql`
    subscription {
        hikes {
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
            }
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
