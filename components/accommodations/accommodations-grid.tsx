"use client";

import { rooms } from "@/lib/data/pousada";
import { RoomCard } from "./room-card";
import { useReveal } from "@/lib/animations/use-reveal";

export function AccommodationsGrid() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <div
      ref={scope}
      className="mx-auto grid max-w-7xl gap-8 px-6 py-20 sm:grid-cols-2 lg:grid-cols-3"
    >
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          id={room.id}
          slug={room.slug}
          capacity={room.capacity}
          image={room.images[0]}
          amenityIds={room.amenityIds}
        />
      ))}
    </div>
  );
}
