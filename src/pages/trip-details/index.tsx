import {
  Calendar,
  CircleCheck,
  CircleDashed,
  Link2,
  MapPin,
  Plus,
  Settings2,
  Tag,
  UserCog,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { CreationActivityModal } from "./creation-activity-modal";
import { CreationLinkModal } from "./creation-link-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";

export function TripDetailsPage() {
  const [isCreateActivityModal, setIsCreateActivityModal] = useState(false);
  const [isCreateLinkModal, setIsCreateLinkModal] = useState(false);

  function toggleCreateActivityModal() {
    setIsCreateActivityModal(!isCreateActivityModal);
  }

  function toggleCreateLinkModal() {
    setIsCreateLinkModal(!isCreateLinkModal);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <Activities toggleCreateActivityModal={toggleCreateActivityModal} />

        <div className="w-80 space-y-6">
          <ImportantLinks toggleCreateLinkModal={toggleCreateLinkModal} />

          <div className="w-full h-px bg-zinc-800" />

          <Guests />
        </div>
      </main>

      {isCreateActivityModal && (
        <CreationActivityModal
          toggleCreateActivityModal={toggleCreateActivityModal}
        />
      )}

      {isCreateLinkModal && (
        <CreationLinkModal toggleCreateLinkModal={toggleCreateLinkModal} />
      )}
    </div>
  );
}
