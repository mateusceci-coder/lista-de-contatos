import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"

export default function Signin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res =  await axios.post('http://127.0.0.1:8000/api/register/', {
      username: username,
      password: password,
    })

    sessionStorage.setItem('accessToken', res.data.access)
    sessionStorage.setItem('refreshToken', res.data.refresh)
    window.location.href = '/'
  }

  return (
    <div className="h-screen bg-zinc-300">
        <h1 className="text-center py-12">Create your account!</h1>

        <form className="py-12 px-4 shadow-2xl rounded-xl max-w-md mx-auto">
          <h2 className="text-center mb-4">Sign In</h2>
            <div>
              <Label>Create Username:</Label>
              <Input type="text"onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              <Label>Create Password:</Label>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="mt-4" type="submit" onClick={(e) =>handleSubmit(e)}>Create Account</Button>
        </form>
    </div>
  )
}
