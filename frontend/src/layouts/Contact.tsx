import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getContactParams } from "@/interfaces/ContactParams";
import axios from "axios"


export default function Contact(data: getContactParams) {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(data.name);
  const [originalName, setOriginalName] = useState("");

  const [phone, setPhone] = useState(data.phone);
  const [originalPhone, setOriginalPhone] = useState("");

  const [email, setEmail] = useState(data.email);
  const [originalEmail, setOriginalEmail] = useState("");

  const [address, setAddress] = useState(data.address);
  const [originalAddress, setOriginalAddress] = useState("");

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

  const token = sessionStorage.getItem("accessToken")

  const handleDelete = async (id:number) => {
      try {
        axios.delete(`http://127.0.0.1:8000/api/contacts/${id}/`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (error) {
        console.log(error)
      }
      window.location.reload()
  }

  return isEditing ? (
    <div className="p-4 border-2 w-80 flex flex-col my-2 rounded-xl border-black bg-white">
      <div>
        <Label>Name:</Label>
        <Input
          type="text"
          placeholder="Name"
          className="pb-2 border-b-2 mb-6"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="mb-4">
        <Label>Phone:</Label>
        <Input
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(xx) xxxxx-xxxx"
          value={phone}
        />
      </div>
      <div className="mb-4">
        <Label>Email:</Label>
        <Input
          type="email"
          placeholder="johndoe@email.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="mb-4">
        <Label>Address:</Label>
        <Input
          type="text"
          placeholder="123 Maple Street, Springfield"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
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
    <div className="p-4 border-2 w-80 flex flex-col my-2 rounded-xl border-black bg-white text-black">
      <div>
        <h1 className="mb-6 pb-2 border-b-2">{data.name}</h1>
      </div>
      <div className="mb-4">
        <Label>Phone:</Label>
        <p>{data.phone}</p>
      </div>
      <div className="mb-4">
        <Label>Email:</Label>
        <p>{data.email}</p>
      </div>
      <div className="mb-4">
        <Label>Address:</Label>
        <p>{data.address}</p>
      </div>
      <div className="mx-auto">
        <Button
          onClick={() => setIsEditing(true)}
          className="mr-2 bg-green-500 hover:bg-green-600"
        >
          Edit
        </Button>
        <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleDelete(data.id)}>Delete</Button>
      </div>
    </div>
  );
}
