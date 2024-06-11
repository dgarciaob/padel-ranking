"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMediaQuery } from "usehooks-ts";
import { MatchForm } from "./MatchForm";

export const ResultModal = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"}>
            <Plus className="size-4 mr-2" />
            Agregar Resultado
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Añade tu resultado</DialogTitle>
            <DialogDescription>
              Añade tu resultado para que se refleje en el ranking.
            </DialogDescription>
          </DialogHeader>
          <MatchForm />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size={"sm"}>
          <Plus className="size-4 mr-2" />
          Agregar Resultado
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl">Añade tu resultado</DrawerTitle>
          <DrawerDescription>
            Añade tu resultado para que se refleje en el ranking.
          </DrawerDescription>
        </DrawerHeader>
        <MatchForm />
      </DrawerContent>
    </Drawer>
  );
};
