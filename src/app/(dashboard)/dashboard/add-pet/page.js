"use client";

import { FieldError, Input, Label, TextField, Select, ListBox, TextArea, Button, Card } from "@heroui/react";

export default function AddPetPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());
console.log("Submitting Pet Data:", petData);

// 
  
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    try {
      const res = await fetch(`${serverUrl}/petdata`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(petData)
      });
console.log("Server Response:", res);
      if (res.ok) {
        alert("Pet added successfully!");
        // e.currentTarget.reset();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData?.message || "Server responded with an error.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Cannot connect to server! Did you forget to start your backend server?");
    }
  };

  return (
    <div className="p-5 max-w-3xl mx-auto">
      
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Add a Pet for Adoption</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Fill in the details to find a loving home for a furry friend.
        </p>
      </div>

      <Card className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50" shadow="sm">
        <form onSubmit={onSubmit} className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField name="petName" isRequired>
              <Label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Pet Name</Label>
              <Input placeholder="e.g. Buddy" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <TextField name="breed" isRequired>
              <Label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Breed / Species</Label>
              <Input placeholder="e.g. Persian Cat" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TextField name="age" isRequired>
              <Label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Age</Label>
              <Input placeholder="e.g. 2 years" className="rounded-2xl" />
              <FieldError />
            </TextField>

            <div>
              <Select
                name="gender"
                isRequired
                className="w-full"
                placeholder="Select gender"
              >
                <Label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Gender</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Male" textValue="Male">Male</ListBox.Item>
                    <ListBox.Item id="Female" textValue="Female">Female</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField name="adoptionFee" type="number" isRequired>
              <Label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Adoption Fee (BDT)</Label>
              <Input type="number" placeholder="e.g. 1500" className="rounded-2xl" />
              <FieldError />
            </TextField>
          </div>

          <TextField name="location" isRequired>
            <Label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Location</Label>
            <Input placeholder="e.g. Dhaka, Bangladesh" className="rounded-2xl" />
            <FieldError />
          </TextField>

          <TextField name="description" isRequired>
            <Label className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Description</Label>
            <TextArea
              placeholder="Tell us something about the pet's behavior and health..."
              className="rounded-3xl"
            />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            className="w-full bg-[#FFA600] hover:bg-[#E09200] text-white font-bold py-3 rounded-xl shadow-md transition-all"
          >
            Submit Listing
          </Button>

        </form>
      </Card>

    </div>
  );
}