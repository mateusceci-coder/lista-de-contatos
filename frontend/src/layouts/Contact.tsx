import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { contactParams } from "@/interfaces/ContactParams";


export default function Contact(contact: contactParams) {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");

  const [phone, setPhone] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");

  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  const [originalAddress, setOriginalAddress] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = () => {
    setOriginalName(name);
    setOriginalPhone(phone);
    setOriginalAddress(address);
    setOriginalEmail(email);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(originalName);
    setPhone(originalPhone);
    setEmail(originalEmail);
    setAddress(originalAddress);

    setIsEditing(false);
  };

  return isEditing ? (
    <div className="p-4 border-2 w-80 flex flex-col my-2 rounded-xl border-black bg-white">
      <div>
        <Label>Name:</Label>
        <Input
          type="text"
          placeholder="Name"
          className="pb-2 border-b-2 mb-6"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label>Phone:</Label>
        <Input
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(xx) xxxxx-xxxx"
        />
      </div>
      <div className="mb-4">
        <Label>Email:</Label>
        <Input
          type="email"
          placeholder="johndoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label>Address:</Label>
        <Input
          type="text"
          placeholder="123 Maple Street, Springfield"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mx-auto">
        <Button className="mr-2" onClick={handleSave}>
          Save
        </Button>
        <Button
          onClick={handleCancel}
          className="bg-stone-500 hover:bg-stone-600"
        >
          Cancel
        </Button>
      </div>
    </div>
  ) : (
    <div className="p-4 border-2 w-80 flex flex-col my-2 rounded-xl border-black bg-white">
      <div>
        <h1 className="mb-6 pb-2 border-b-2">{contact.name}</h1>
      </div>
      <div className="mb-4">
        <Label>Phone:</Label>
        <p>{contact.phone}</p>
      </div>
      <div className="mb-4">
        <Label>Email:</Label>
        <p>{contact.email}</p>
      </div>
      <div className="mb-4">
        <Label>Address:</Label>
        <p>{contact.address}</p>
      </div>
      <div className="mx-auto">
        <Button
          onClick={() => setIsEditing(true)}
          className="mr-2 bg-green-500 hover:bg-green-600"
        >
          Edit
        </Button>
        <Button className="bg-red-500 hover:bg-red-600">Delete</Button>
      </div>
    </div>
  );
}
