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

  const token = sessionStorage.getItem("accessToken");

  const fetchData = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/contacts/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const sortedContacts = res.data.sort(
      (a: getContactParams, b: getContactParams) => {
        return a.name.localeCompare(b.name);
      }
    );

    setListContacts(sortedContacts);
  };

  useEffect(() => {
    token && fetchData();
  }, []);

  const handleSignin = () => {
    window.location.href = "/signin";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    window.location.href = "/login";
  };

  return (
    <main className="bg-zinc-300 min-h-screen font-roboto">
      <nav className="bg-zinc-200">
        <div className="max-w-5xl flex justify-between mx-auto p-2 sm:p-10">
          <div className="flex gap-1">
            <img src="src/images/writing.png" alt="Writing Image" width={60} />
            <h1 className="text-red-600 text-lg sm:text-2xl mt-4">
            Welcome to your contact list!
          </h1>

          </div>
          <div>
            {token ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <div className="flex flex-col sm:inline">
                <Button onClick={handleSignin}>Sign In</Button> <span className="text-center"> or{" "}</span>
                <Button onClick={handleLogin} data-test="login-home">
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <section className="max-w-5xl mx-auto my-4">
        <NewContact />
      </section>
      <section className="flex justify-center items-center">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {listContacts ? (
          listContacts.length === 0 ? (
            <div className="mt-10 text-xl">
              <h1 className="text-2xl" data-test="no-contacts">No contacts</h1>
            </div>
          ) : (
            listContacts.map((contact) => (
              <li key={contact.id} data-test="list-contacts">
                <Contact {...contact} />
              </li>
            ))
          )
        ) : (
          <div>
            <h1 className="text-2xl">No contacts</h1>
          </div>
        )}
      </ul>

      </section>
    </main>
  );
}
