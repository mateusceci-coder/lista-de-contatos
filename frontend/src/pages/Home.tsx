import { Button } from "@/components/ui/button";
import { getContactParams } from "@/interfaces/ContactParams";
import Contact from "@/layouts/Contact";
import NewContact from "@/layouts/NewContact";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {
  const [listContacts, setListContacts] = useState<getContactParams[] | null>(
    null
    );

    const token = sessionStorage.getItem("accessToken")

    const fetchData = async () => {
      const res = await axios.get("http://127.0.0.1:8000/api/contacts/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListContacts(res.data);
    };

    useEffect(() => {
      token && fetchData();
    }, []);


    const handleSignin = () => {
      window.location.href = "/signin";
    };

    const handleLogin = () => {
      window.location.href = "/login"
    }

    const handleLogout = () => {
      sessionStorage.removeItem("accessToken")
      sessionStorage.removeItem("refreshToken")

      window.location.href = "/login"
    }

    console.log(token)
    return (
      <main className="bg-zinc-300 min-h-screen">
      <nav className="max-w-5xl flex justify-between mx-auto p-10">
        <h1>Welcome to your contact list!</h1>
        <div>
        {token ? <Button onClick={handleLogout}>Logout</Button> : <>
        <Button onClick={handleSignin}>Sign In</Button> or <Button onClick={handleLogin} data-test="login-home" >Login</Button>
        </>
        }
        </div>
      </nav>
      <section className="max-w-5xl mx-auto my-4">
        <NewContact  />
      </section>
      <ul  className="max-w-5xl grid grid-cols-3 mx-auto">
        {listContacts ? (
          listContacts.length === 0 ? (
            <h1 data-test="no-contacts">No contacts</h1>
          ) : (
            listContacts.map((contact) => (
              <li data-test="list-contacts">
                <Contact key={contact.id} {...contact}  />
              </li>
            ))
          )
        ) : (
          <>
            <h1>Loading</h1>
          </>
        )}
      </ul>
    </main>
  );
}
