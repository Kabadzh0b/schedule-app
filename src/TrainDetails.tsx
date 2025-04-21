import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScheduleItem } from "./ScheduleList";
import dayjs from "dayjs";

export function TrainDetails() {
  const { id } = useParams();
  const [scheduleItem, setScheduleItem] = useState<ScheduleItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await fetch(`/api/schedule/${id}`);
        if (!response.ok) throw new Error("Train not found");
        const data = await response.json();
        setScheduleItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainDetails();
  }, [id]);

  if (loading) return <div>Loading train details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!scheduleItem) return <div>No train data available</div>;

  return (
    <div className="details">
      <h2>Train {scheduleItem.train.name}</h2>
      <div className="detail-section">
        <h3>Departure</h3>
        <p>
          <strong>City:</strong> {scheduleItem.from.name}
        </p>
        <p>
          <strong>Time:</strong>{" "}
          {dayjs(scheduleItem.departureTime).format("DD/MM/YYYY HH:mm")}
        </p>
      </div>

      <div className="detail-section">
        <h3>Arrival</h3>
        <p>
          <strong>City:</strong> {scheduleItem.to.name}
        </p>
        <p>
          <strong>Time:</strong>{" "}
          {dayjs(scheduleItem.arrivalTime).format("DD/MM/YYYY HH:mm")}
        </p>
        <p>
          <strong>Platform:</strong>
        </p>
      </div>

      <p>
        <strong>Journey Duration:</strong> {scheduleItem.durationMinutes}{" "}
        minutes
      </p>
      <p>
        <strong>Distance:</strong> {scheduleItem.distanceKm} km
      </p>
    </div>
  );
}
