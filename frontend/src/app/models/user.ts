import {Role} from './role'

export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    userRole?: Role;
}