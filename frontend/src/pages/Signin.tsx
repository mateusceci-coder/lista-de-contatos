import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"

export default function Signin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [passwordDiff, setPasswordDiff] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(password !== password2) {
      setPasswordDiff(true)
      return
    }

    try {
      const res =  await axios.post('http://127.0.0.1:8000/api/register/', {
        username: username,
        password: password,
      })
      sessionStorage.setItem('accessToken', res.data.access)
      sessionStorage.setItem('refreshToken', res.data.refresh)
      window.location.href = '/'

    } catch (error) {

      if (error.response && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
    } else {
        setErrorMessage('An error occurred during registration.');
    }
    }
  }

  return (
    <div className="h-screen bg-zinc-300">
        <h1 className="text-center py-12">Create your account!</h1>

        <form className="py-12 px-4 shadow-2xl rounded-xl max-w-md mx-auto" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="text-center mb-4">Sign In</h2>
            <div>
              <p className="text-sm text-red-500 mb-1">{errorMessage}</p>
              <Label>Create Username:</Label>
              <Input type="text"onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              <Label>Create Password:</Label>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <Label>Confirm Password:</Label>
              <Input type="password" onChange={(e) => setPassword2(e.target.value)} />
            </div>
            {passwordDiff && <p className="text-sm text-red-500">The passwords are different</p>}
            <Button className="mt-4" type="submit">Create Account</Button>
        </form>
    </div>
  )
}
