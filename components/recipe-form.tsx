import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"

import { formSchema } from "@/types/types"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { RadioGroupFormField } from "@/components/radio-group-form-field"
import { SelectFormField } from "@/components/select-form-field"
import { SwitchFormField } from "@/components/switch-form-field"

interface RecipeFormProps {
  onSubmit: (values: any, e: React.FormEvent) => void // Replace with the appropriate type
  isLoading: boolean
}

export function RecipeForm({ onSubmit, isLoading }: RecipeFormProps) {
  const form = useForm<any>({
    // Replace with the appropriate type
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: "",
      time: [5],
      people: "2",
      difficulty: "easy",
      vegetarian: false,
      vegan: false,
      gluten_free: false,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                1. What ingredients do you have?
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. chicken, carrots, lemon, ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">
                2. How much time do you have?
              </FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[5]}
                  max={120}
                  step={10}
                  min={5}
                  onValueChange={field.onChange}
                  {...field}
                />
              </FormControl>
              <FormDescription className="flex">
                <span className="mx-auto">⏲️ {field.value} minutes</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel className="font-semibold">3. How many people?</FormLabel>
          <RadioGroupFormField form={form} name="people" />
        </FormItem>
        <FormItem>
          <FormLabel className="font-semibold">
            4. Are you a good chef?
          </FormLabel>
          <SelectFormField form={form} name="difficulty" />
        </FormItem>
        <FormItem>
          <FormLabel className="font-semibold">
            5. Do you have diet preference?
          </FormLabel>
          <SwitchFormField
            form={form}
            name="vegetarian"
            label="🥗 Vegetarian"
          />
          <SwitchFormField form={form} name="vegan" label="🌿 Vegan" />
          <SwitchFormField
            form={form}
            name="gluten_free"
            label="🌾 Gluten-Free"
          />
        </FormItem>
        {isLoading ? (
          <Button disabled size="lg" className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          >
            Generate
          </Button>
        )}
      </form>
    </Form>
  )
}
