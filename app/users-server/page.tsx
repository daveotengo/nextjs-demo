import { resolve } from "path";

type User={
    id:number;
    name: string;
    username: string;
    email: string;
    phone: string;
}


export  default async function UserServer() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  await new Promise((resolve)=> setTimeout(resolve,2000) );
  const users = await response.json();

  return (
    <ul className='space-y-4 p-4'>
        {users.map((user: User) => (
            <li 
            key={user.id}
            className='p-4 bg-white shadow-md rounded-lg text-gray-700'
            >{user.name} ({user.email})</li>

        ))} 
    </ul>
  )
}
