import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { MatchType } from "@prisma/client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { createMatch } from "@/actions/match-actions";

const formSchema = z.object({
  playerScore: z.coerce.number(),
  opponentScore: z.coerce.number(),
  date: z.date(),
  type: z.nativeEnum(MatchType),
});

export const MatchForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerScore: 0,
      opponentScore: 0,
      date: new Date(),
      type: "Amistoso" as MatchType,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createMatch(values);
      toast.success("Tu partido fue guardado! 🎉");
      router.refresh();
    } catch (error) {
      toast.error("Hubo un error al guardar el partido 😭");
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4 pt-4 px-4 md:px-0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <FormField
            control={form.control}
            name="playerScore"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Score Propio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="Cuántos sets ganaste?"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="opponentScore"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Score Contrincante</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="Cuántos sets gano tu rival?"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tipo de Partido</FormLabel>
                <FormControl>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tipo de partido" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Amistoso">Amistoso</SelectItem>
                        <SelectItem value="Torneo">Torneo</SelectItem>
                        <SelectItem value="Americano">Americano</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col gap-y-1">
                <FormLabel>Fecha del Partido</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Elige la fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() ||
                        date < new Date("1900-01-01") ||
                        isSubmitting
                      }
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            );
          }}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={isSubmitting || !isValid}
        >
          Guardar
        </Button>
      </form>
    </Form>
  );
};
