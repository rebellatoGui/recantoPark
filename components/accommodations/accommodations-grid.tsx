"use client";

import { rooms } from "@/lib/data/pousada";
import { RoomCard } from "./room-card";
import { useReveal } from "@/lib/animations/use-reveal";

export function AccommodationsGrid() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <div
      ref={scope}
      className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-14 md:py-20"
    >
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          id={room.id}
          slug={room.slug}
          capacity={room.capacity}
          image={room.images[0]}
          amenityIds={room.amenityIds}
          layout="list"
        />
      ))}
    </div>
  );
}
