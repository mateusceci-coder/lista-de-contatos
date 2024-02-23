import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import axios from "axios"

export default function NewContact() {
  const [name, setName] = useState("")
  const [phone, setPhone] =  useState(0)
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")

  const token = sessionStorage.getItem('auth_token')
 
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
    e.preventDefault()

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/contacts/', {
        name,
        phone,
        address,
        email,
      }, {headers: {Authorization: `Bearer ${token}` }})

      console.log(res.data)
      
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <Dialog>
        <DialogTrigger className="border-2 p-2 rounded-xl text-white bg-black">Create New Contact</DialogTrigger>
        <DialogContent>
          <form className="flex justify-center flex-col gap-4">
            <div>
              <Label>Name:</Label>
              <Input type="text" placeholder="John Doe" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>Phone:</Label>
              <Input type="number" placeholder="(xx) xxxxx-xxxx" onChange={(e) => setPhone(Number(e.target.value))} />
            </div>
            <div>
              <Label>Email:</Label>
              <Input type="email" placeholder="john@email.com" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>Address:</Label>
              <Input type="text" placeholder="123 Maple Street, Springfield" onChange={(e) => setAddress(e.target.value)} />
            </div>
            <Button type="submit" onClick={(e) => handleSubmit(e)}>Add contact</Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
