import { Button } from "@/components/ui/button";
import Contact from "@/layouts/Contact";
import NewContact from "@/layouts/NewContact";


export default function Home() {
  return (
    <main className="bg-zinc-300 min-h-screen">
      <nav className="max-w-5xl flex justify-between mx-auto p-10">
        <h1>Welcome to your contact list!</h1>
        <Button>Sign In</Button>
      </nav>
      <section className="max-w-5xl mx-auto my-4">
        <NewContact />
      </section>
      <section className="max-w-5xl grid grid-cols-3 mx-auto">
        <Contact />
      </section>
    </main>
  );
}
