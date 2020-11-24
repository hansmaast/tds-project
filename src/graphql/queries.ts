import { gql } from '@apollo/client/core';

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
