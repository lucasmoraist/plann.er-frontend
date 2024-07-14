import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/button";
import { DateRange, DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  toggleGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDate: (date: DateRange | undefined) => void;
  eventStartAndEndDate: DateRange | undefined;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  toggleGuestsInput,
  setDestination,
  setEventStartAndEndDate,
  eventStartAndEndDate
}: DestinationAndDateStepProps) {
  const [isDatePicker, setIsDatePicker] = useState(false);

  function toggleDatePicker() {
    setIsDatePicker(!isDatePicker);
  }

    const displayedDate = eventStartAndEndDate && eventStartAndEndDate.from && eventStartAndEndDate.to
    ? format(eventStartAndEndDate.from, "d ' de ' LLL")
    .concat(' até ')
    .concat(format(eventStartAndEndDate.to, "d ' de ' LLL")) 
    : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestsInputOpen}
          type="text"
          placeholder="Para aonde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <button
        onClick={toggleDatePicker}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 outline-none text-left w-[240px]"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || "Quando?"}
        </span>
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={toggleGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5 text-zinc-200" />
        </Button>
      ) : (
        <Button onClick={toggleGuestsInput}>
          Continuar
          <ArrowRight className="size-5 text-lime-950" />
        </Button>
      )}

      {isDatePicker && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={toggleDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker mode="range" selected={eventStartAndEndDate} onSelect={setEventStartAndEndDate} />
          </div>
        </div>
      )}
    </div>
  );
}
