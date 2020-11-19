import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
    fragment UserObject on User {
        id
        name
        lastName
        email
        registerDate @include(if: $include)
        birthDay @include(if: $include)
        role
    }
`;
