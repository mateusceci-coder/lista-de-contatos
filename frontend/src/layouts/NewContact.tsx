import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function NewContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const token = sessionStorage.getItem("accessToken");

  const handleSubmit = async () => {

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/contacts/",
        {
          name,
          phone,
          address,
          email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger data-test="new-contact-btn" className="border-2 p-2 rounded-xl text-white bg-black">
        Create New Contact
      </DialogTrigger>
      <DialogContent>
        <form className="flex justify-center flex-col gap-4" onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}>
          <div>
            <Label>Name:</Label>
            <Input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
              data-test="new-name"
            />
          </div>
          <div>
            <Label>Phone:</Label>
            <Input
              type="number"
              placeholder="(xx) xxxxx-xxxx"
              onChange={(e) => setPhone(Number(e.target.value))}
              required
              data-test="new-phone"
            />
          </div>
          <div>
            <Label>Email:</Label>
            <Input
              type="email"
              placeholder="john@email.com"
              onChange={(e) => setEmail(e.target.value)}
              data-test="new-email"
            />
          </div>
          <div>
            <Label>Address:</Label>
            <Input
              type="text"
              placeholder="123 Maple Street, Springfield"
              onChange={(e) => setAddress(e.target.value)}
              data-test="new-address"
            />
          </div>
          <DialogClose asChild>
            <Button data-test="add-contact-btn" type="submit">
              Add contact
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
