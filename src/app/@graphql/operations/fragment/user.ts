import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
    fragment UserObject on User {
        id
        name
        lastName
        email
        password @include(if: $include)
        registerDate @include(if: $include)
        birthDay @include(if: $include)
        role
    }
`;
