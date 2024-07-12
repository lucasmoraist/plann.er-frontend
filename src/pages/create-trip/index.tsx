import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDate, setEventStartAndEndDate] = useState<
    DateRange | undefined
  >();

  function toggleGuestsInput() {
    setIsGuestsInputOpen(!isGuestsInputOpen);
  }

  function toggleGuestsModal() {
    setIsGuestsModalOpen(!isGuestsModalOpen);
  }

  function toggleConfirmTripModal() {
    setIsConfirmTripModalOpen(!isConfirmTripModalOpen);
  }

  function addNewEmailToInvite(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) return;

    if (emailsToInvite.includes(email)) return;

    setEmailsToInvite([...emailsToInvite, email]);

    e.currentTarget.reset();
  }

  function removeEmailToInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  }

  async function createTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!destination) return;
    if (!eventStartAndEndDate?.from || !eventStartAndEndDate?.to) return;
    if (!ownerName || !ownerEmail) return;
    if (emailsToInvite.length === 0) return;

    console.log(destination);
    console.log(eventStartAndEndDate?.from);
    console.log(eventStartAndEndDate?.to);
    console.log(emailsToInvite);
    console.log(ownerEmail);
    console.log(ownerName);

    const response = await api.post("/trips", {
      destination,
      startAt: eventStartAndEndDate?.from,
      endAt: eventStartAndEndDate?.to,
      emailsToInvite,
      ownerName,
      ownerEmail
    });

    console.log(response.data);

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            toggleGuestsInput={toggleGuestsInput}
            setDestination={setDestination}
            setEventStartAndEndDate={setEventStartAndEndDate}
            eventStartAndEndDate={eventStartAndEndDate}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              toggleConfirmTripModal={toggleConfirmTripModal}
              toggleGuestsModal={toggleGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com
          nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          emailsToInvite={emailsToInvite}
          removeEmailToInvite={removeEmailToInvite}
          toggleGuestsModal={toggleGuestsModal}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          createTrip={createTrip}
          toggleConfirmTripModal={toggleConfirmTripModal}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
}
