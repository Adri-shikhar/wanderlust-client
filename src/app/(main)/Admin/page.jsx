"use client";
import React from "react";
import {
  TextField,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";
import { FiTrash2, FiSave } from "react-icons/fi";
import { toast } from "sonner";
import { addDestination } from "../lib/data";

const fieldShell =
  "mt-1.5 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-gray-900 shadow-sm outline-none transition-colors focus:border-teal-500 focus:ring-1 focus:ring-teal-500";

export default function Admin() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const destinationName = formData.get("destinationName");
    const country = formData.get("country");
    const category = formData.get("category");
    const price = formData.get("price");
    const duration = formData.get("duration");
    const departureDate = formData.get("departureDate");
    const imageUrl = formData.get("imageUrl");
    const description = formData.get("description");
    const data = { destinationName, country, category, price, duration, departureDate, imageUrl, description };
    try {
      const response = await addDestination(data);
      if (response?.acknowledged) {
        toast.success("Destination added successfully");
      } else {
        toast.error("Failed to add destination");
      }
    } catch {
      toast.error("Failed to add destination");
    }
  };
  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl animate-fade-in-up">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#33A1C9]">Admin</p>
        <h1 className="mb-8 mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add New Travel Package
        </h1>

        <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
            <div className="md:col-span-2">
              <TextField name="destinationName" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Destination Name
                </Label>
                <Input
                  placeholder="Bali Paradise"
                  className={fieldShell}
                />
                <FieldError />
              </TextField>
            </div>

            <TextField name="country" isRequired>
              <Label className="text-sm font-medium text-gray-700">
                Country
              </Label>
              <Input placeholder="Indonesia" className={fieldShell} />
              <FieldError />
            </TextField>

            <div>
              <Select name="category" isRequired placeholder="Beach">
                <Label className="text-sm font-medium text-gray-700">
                  Category
                </Label>
                <Select.Trigger className={fieldShell}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Beach" textValue="Beach">
                      Beach
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Mountain" textValue="Mountain">
                      Mountain
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="City" textValue="City">
                      City
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Adventure" textValue="Adventure">
                      Adventure
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Cultural" textValue="Cultural">
                      Cultural
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Luxury" textValue="Luxury">
                      Luxury
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField name="price" type="number" isRequired>
              <Label className="text-sm font-medium text-gray-700">
                Price (USD)
              </Label>
              <Input
                type="number"
                placeholder="e.g., 1299"
                className={fieldShell}
              />
              <FieldError />
            </TextField>

            <TextField name="duration" isRequired>
              <Label className="text-sm font-medium text-gray-700">
                Duration
              </Label>
              <Input
                placeholder="e.g., 7 Days/6 Nights"
                className={fieldShell}
              />
              <FieldError />
            </TextField>

            <div className="md:col-span-2">
              <TextField name="departureDate" type="date" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Departure Date
                </Label>
                <Input type="date" className={fieldShell} />
                <FieldError />
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField name="imageUrl" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Image URL
                </Label>
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className={fieldShell}
                />
                <FieldError />
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <TextArea
                  placeholder="Describe the travel experience.."
                  rows={5}
                  className={`${fieldShell} min-h-[140px] resize-y`}
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-end gap-3 border-t border-gray-100 pt-6">
            <Button
              type="reset"
              variant="bordered"
              className="min-w-[120px] border-red-500 font-medium text-red-600 hover:bg-red-50"
            >
              <span className="flex items-center gap-2">
                <FiTrash2 className="size-4 shrink-0" aria-hidden />
                Cancel
              </span>
            </Button>
            <Button
              type='submit' 
             
              className="min-w-[200px] bg-teal-600 font-medium text-white hover:bg-teal-700"
            >
              Add Travel Package
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
