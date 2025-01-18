import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";



type MockUser={
    id:number;
    name: string;
}


export  default async function MockUsers() {
  const authObj = await auth();
  const userObj = await currentUser();

  console.log({
    authObj,
    userObj
  });

  const response = await fetch("https://678bd6171a6b89b27a2b9ba9.mockapi.io/api/v1/users");
  const users = await response.json();
 
  async function addUser(formData:FormData) {
    "use server";
    const name = formData.get("name");
    const res = await fetch(
        "https://678bd6171a6b89b27a2b9ba9.mockapi.io/api/v1/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer YOUR_PRIVATE_KEY"
            },
            body: JSON.stringify({name}),

        }
    );
    const newUser = await res.json();
    revalidatePath("/mock-users")
    console.log(newUser);
  }

  return (
    <div className="py-10">
        <form className="mb-4" action={addUser} >
            <input type="text" name="name" required className="border p-2 mr-2"/> 
            <button type="submit">Add User</button>
        </form>
    <div className='grid grid-cols-4 gap-4 py-10'>
        {users.map((user: MockUser) => (
            <div 
            key={user.id}
            className='p-4 bg-white shadow-md rounded-lg text-gray-700'
            >{user.name}</div>

        ))} 
    </div>
    </div>
  )
}
