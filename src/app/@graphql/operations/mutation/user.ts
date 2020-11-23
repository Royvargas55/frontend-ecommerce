import { USER_FRAGMENT } from '@graphql/operations/fragment/user';
import gql from 'graphql-tag';

export const REGISTER_USER = gql`
    mutation addUser($user: userInput!, $include: Boolean!) {
        register(user: $user) {
            status
            message
            user {
                ...UserObject
            }
        }
    }
    ${ USER_FRAGMENT }
`;

export const UPDATE_USER = gql`
    mutation updateUser($user: userInput!, $include: Boolean!) {
        updateUser(user: $user) {
            status
            message
            user {
                ...UserObject
            }
        }
    }
    ${ USER_FRAGMENT }
`;


export const BLOCK_USER = gql`
    mutation blockUser($id: Int!, $unblock: Boolean, $admin: Boolean) {
        blockUser(id: $id, unblock: $unblock, admin: $admin){
            status
            message
        }
    }
`;

export const ACTIVE_EMAIL_USER = gql`
  mutation activarUsuarioEmail($id: Int!, $email: String!) {
    activeUserEmail( id: $id, email: $email ) {
      status
      message
    }
  }
`;

export const ACTIVE_USER = gql`
  mutation activeUser($id: Int!, $birthDay: String!, $password: String!) {
    activeUserAction(id: $id, birthDay: $birthDay, password: $password) {
      status
      message
    }
  }
`;

