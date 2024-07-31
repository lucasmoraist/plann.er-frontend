import { CircleCheck, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { IActivity } from "../../interface/activity";
import { api } from "../../lib/axios";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ActivitiesProps {
  toggleCreateActivityModal: () => void;
}

export function Activities({ toggleCreateActivityModal }: ActivitiesProps) {
  const { tripId } = useParams();
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchActivities = async () => {
      try {
        const response = await api.get(`/trips/${tripId}/activities`, {
          signal,
        });
        setActivities(response.data);
      } catch (err) {
        if (!signal.aborted) {
          console.error(err);
        }
      }
    };

    fetchActivities();

    return () => {
      controller.abort();
    };
  }, [tripId]);

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Atividades</h2>
        <Button onClick={toggleCreateActivityModal}>
          <Plus className="size-5" />
          Cadastrar atividade
        </Button>
      </div>

      <div className="space-y-8">
        {activities.map((category) => {
          const categoryDate = new Date(category.date);

          const newDate = addDays(categoryDate, 1);

          const displayDate = format(newDate, "EEEE", { locale: ptBR });

          return (
            <div key={categoryDate.toISOString()} className="space-y-2.5">
              <div className="flex gap-2 items-baseline">
                <span className="text-xl text-zinc-300 font-semibold">
                  Dia {categoryDate.getUTCDate()}
                </span>
                <span className="text-xs text-zinc-500">{displayDate}</span>
              </div>

              {category.activities.length > 0 ? (
                <div>
                  {category.activities.map((activity) => {
                    return (
                      <div
                        key={activity.id}
                        className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3"
                      >
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(activity.occursAt, "HH:mm")}h
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-zinc-500 text-sm">
                  Nenhuma atividade cadastrada
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
