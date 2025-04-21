import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

interface TrainItem {
  id: string;
  name: string;
  description: string;
}

export interface ScheduleItem {
  id: string;
  durationMinutes: number;
  distanceKm: number;
  arrivalTime: Date;
  departureTime: Date;
  from: TrainItem;
  to: TrainItem;
  train: TrainItem;
}

export function ScheduleList() {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch("/api/schedule");
        if (!response.ok) throw new Error("Failed to fetch schedule");
        const data = await response.json();
        setScheduleItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, []);

  if (loading) return <div>Loading schedule...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="schedule">
      <h2>Train Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>From</th>
            <th>To</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {scheduleItems.map((scheduleItem) => (
            <tr key={scheduleItem.id}>
              <td>{scheduleItem.train.name}</td>
              <td>{scheduleItem.from.name}</td>
              <td>{scheduleItem.to.name}</td>
              <td>
                {dayjs(scheduleItem.departureTime).format("DD/MM/YYYY HH:mm")}
              </td>
              <td>
                {dayjs(scheduleItem.arrivalTime).format("DD/MM/YYYY HH:mm")}
              </td>
              <td>
                <Link to={`/${scheduleItem.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
