import { Button } from "@/components/ui/button";
import { getContactParams } from "@/interfaces/ContactParams";
import Contact from "@/layouts/Contact";
import NewContact from "@/layouts/NewContact";
import axios from "axios"
import { useEffect, useState } from "react";

const handleSignin = () => {
  window.location.href = "/signin"
}

export default function Home() {
  const[listContacts, setListContacts] = useState<getContactParams[] | null>(null)


  const token = sessionStorage.getItem("auth_token")

  const fetchData = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/contacts/', {
      headers: {Authorization: `Bearer ${token}` }
    })
    setListContacts(res.data)
  }

  useEffect(() => {
    fetchData()
  },[])

  console.log(token)
  return (
    <main className="bg-zinc-300 min-h-screen">
      <nav className="max-w-5xl flex justify-between mx-auto p-10">
        <h1>Welcome to your contact list!</h1>
        <Button onClick={handleSignin}>Sign In</Button>
      </nav>
      <section className="max-w-5xl mx-auto my-4">
        <NewContact />
      </section>
      <section className="max-w-5xl grid grid-cols-3 mx-auto">
        {listContacts ? listContacts.map((contact) => (
          <Contact key={contact.id} {...contact} />
        )) : <>
                <h1>No contacts</h1>
            </>}
      </section>
    </main>
  );
}
