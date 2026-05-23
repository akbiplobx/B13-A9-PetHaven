"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldError, Input, Label, TextField, Select, ListBox, TextArea, Button, Card } from "@heroui/react";

import toast, { Toaster } from "react-hot-toast";

export default function AddPetPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  
 
  const [userEmail, setUserEmail] = useState("owner@example.com");

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formData.entries());
    
    petData.ownerEmail = userEmail;

    console.log("Submitting Pet Data:", petData);

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

    try {
      const res = await fetch(`${serverUrl}/petdata`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(petData)
      });

      if (res.ok) {
        
        toast.success("Pet added successfully!");
        
        // rediect
        setTimeout(() => {
          router.push("/dashboard/my-listings");
        }, 2000);
        
      } else {
        const errorData = await res.json().catch(() => ({}));
      
        toast.error(errorData?.message || "Server responded with an error.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
     
      toast.error("Cannot connect to server! Did you forget to start your backend?");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
     
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="mb-6">
        <h1 className="text-2xl font-black text-black">Add a Pet for Adoption</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Fill in the details to find a loving home for a furry friend.
        </p>
      </div>

      <Card className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50" shadow="sm">
        <form onSubmit={onSubmit} className="p-10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Pet Name */}
            <div className="md:col-span-2">
              <TextField name="petName" isRequired>
                <Label>Pet Name</Label>
                <Input placeholder="e.g. Buddy" className="rounded-2xl" />
                <FieldError />
              </TextField>
            </div>

            {/* Species */}
            <div>
              <Select
                name="species"
                isRequired
                className="w-full"
                placeholder="Select species"
              >
                <Label>Species</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Dog" textValue="Dog">Dog <ListBox.ItemIndicator /></ListBox.Item>
                    <ListBox.Item id="Cat" textValue="Cat">Cat <ListBox.ItemIndicator /></ListBox.Item>
                    <ListBox.Item id="Bird" textValue="Bird">Bird <ListBox.ItemIndicator /></ListBox.Item>
                    <ListBox.Item id="Other" textValue="Other">Other <ListBox.ItemIndicator /></ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Breed */}
            <TextField name="breed" isRequired>
              <Label>Breed</Label>
              <Input placeholder="e.g. Golden Retriever" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Age */}
            <TextField name="age" isRequired>
              <Label>Age</Label>
              <Input placeholder="e.g. 2 Years" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Gender */}
            <div>
              <Select
                name="gender"
                isRequired
                className="w-full"
                placeholder="Select gender"
              >
                <Label>Gender</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Male" textValue="Male">Male <ListBox.ItemIndicator /></ListBox.Item>
                    <ListBox.Item id="Female" textValue="Female">Female <ListBox.ItemIndicator /></ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Health Status */}
            <TextField name="healthStatus" isRequired>
              <Label>Health Status</Label>
              <Input placeholder="e.g. Fit and Healthy" className="rounded-2xl" />
              <FieldError />
            </TextField>

            {/* Vaccination Status */}
            <div>
              <Select
                name="vaccinationStatus"
                isRequired
                className="w-full"
                placeholder="Select status"
              >
                <Label>Vaccination Status</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Fully" textValue="Fully Vaccinated">Fully Vaccinated <ListBox.ItemIndicator /></ListBox.Item>
                    <ListBox.Item id="Partially" textValue="Partially Vaccinated">Partially Vaccinated <ListBox.ItemIndicator /></ListBox.Item>
                    <ListBox.Item id="Not" textValue="Not Vaccinated">Not Vaccinated <ListBox.ItemIndicator /></ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <TextField name="location" isRequired>
                <Label>Location</Label>
                <Input placeholder="e.g. Dhaka, Bangladesh" className="rounded-2xl" />
                <FieldError />
              </TextField>
            </div>

            {/* Adoption Fee */}
            <div className="md:col-span-2">
              <TextField name="adoptionFee" type="number" isRequired>
                <Label>Adoption Fee (BDT)</Label>
                <Input type="number" placeholder="1500" className="rounded-2xl" />
                <FieldError />
              </TextField>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <TextField name="imageUrl" isRequired>
                <Label>Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://i.ibb.co/example.jpg"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>

            {/* Owner Email (Read Only) */}
            <div className="md:col-span-2">
              <TextField name="ownerEmail" value={userEmail} isReadOnly>
                <Label>Owner Email</Label>
                <Input className="rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-500" />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label>Description</Label>
                <TextArea
                  placeholder="Describe the pet's behavior, history, and medical needs..."
                  className="rounded-3xl"
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="outline"
            isLoading={isPending}
            className="rounded-none w-full bg-[#FFA600] text-white font-bold h-12"
          >
            {isPending ? "Adding Pet..." : "Add Pet Listing"}
          </Button>

        </form>
      </Card>

    </div>
  );
}