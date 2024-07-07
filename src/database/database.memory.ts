import { User } from '../types/dto/user.dto';
const user: User[] = [
    {
        email: 'admin@gmail.com',
        nickname: 'admin',
        userid: 'admin',
        password: 'hashedPassword',
    },
    {
        email: 'user@gmail.com',
        userid: 'user',
        password: 'hashedPassword',
    },
]

const inituserData: User[] = [
    {
        email: 'admin@gmail.com',
        nickname: 'admin',
        userid: 'admin',
        password: 'hashedPassword',
    },
    {
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