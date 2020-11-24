import { gql } from '@apollo/client/core';

export const INSERT_HIKE = gql`
    mutation InsertHike($hike: hikes_insert_input!) {
        insert_hikes_one(object: $hike) {
            title
            description
            coordinates {
                hike_id
                lng_lat
                index
            }
        }
    }`;
