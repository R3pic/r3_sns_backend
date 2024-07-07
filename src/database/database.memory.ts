import { User } from '../types/dto/user.dto';
const user: User[] = [
    {
        id: 1,
        email: 'admin@gmail.com',
        nickname: 'admin',
        userid: 'admin',
        password: 'hashedPassword',
    },
    {
        id: 2,
        email: 'user@gmail.com',
        userid: 'user',
        password: 'hashedPassword',
    },
]

const inituserData: User[] = [
    {
        id: 1,
        email: 'admin@gmail.com',
        nickname: 'admin',
        userid: 'admin',
        password: 'hashedPassword',
    },
    {
        id: 2,
        email: 'user@gmail.com',
        userid: 'user',
        password: 'hashedPassword',
    },
]

const init = () => {
    Database.user = [...inituserData];
}

export const Database = {
    user,
    init
}

export default Database;