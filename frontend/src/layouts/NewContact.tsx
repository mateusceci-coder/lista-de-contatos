import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

export default function NewContact() {
    return (
      <Dialog>
        <DialogTrigger className="border-2 p-2 rounded-xl text-white bg-black">Create New Contact</DialogTrigger>
        <DialogContent>
          <form className="flex justify-center flex-col gap-4">
            <div>
              <Label>Name:</Label>
              <Input type="text" placeholder="John Doe" />
            </div>
            <div>
              <Label>Phone:</Label>
              <Input type="number" placeholder="(xx) xxxxx-xxxx" />
            </div>
            <div>
              <Label>Email:</Label>
              <Input type="email" placeholder="john@email.com" />
            </div>
            <div>
              <Label>Address:</Label>
              <Input type="text" placeholder="123 Maple Street, Springfield" />
            </div>
            <Button>Add contact</Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
