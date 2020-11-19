import { GENRE_FRAGMENT } from '@graphql/operations/fragment/genre';
import gql from 'graphql-tag';

export const ADD_GENRE = gql`
    mutation insertGenre($genre: String!) {
        addGenre(genre: $genre){
            status
            message
            genre {
                ...GenreObject
            }
        }
    }
    ${ GENRE_FRAGMENT }
`;

export const MODIFY_GENRE = gql`
    mutation modifyGenre($id: ID!, $genre: String!) {
        updateGenre(id: $id, genre: $genre){
            status
            message
            genre {
                ...GenreObject
            }
        }
    }
    ${ GENRE_FRAGMENT }
`;

export const BLOCK_GENRE = gql`
    mutation blockGenre($id: ID!) {
        blockGenre(id: $id){
            status
            message
        }
    }
`;
