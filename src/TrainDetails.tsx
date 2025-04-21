import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface TrainDetails {
  id: string;
  number: string;
  departure: {
    city: string;
    time: string;
    platform: string;
  };
  arrival: {
    city: string;
    time: string;
    platform: string;
  };
  duration: string;
  stops: string[];
}

export function TrainDetails() {
  const { id } = useParams();
  const [train, setTrain] = useState<TrainDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await fetch(`/api/schedule/${id}`);
        if (!response.ok) throw new Error("Train not found");
        const data = await response.json();
        setTrain(data);
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
  if (!train) return <div>No train data available</div>;

  return (
    <div className="details">
      <h2>Train {train.number}</h2>
      <div className="detail-section">
        <h3>Departure</h3>
        <p>
          <strong>Station:</strong> {train.departure.city}
        </p>
        <p>
          <strong>Time:</strong> {train.departure.time}
        </p>
        <p>
          <strong>Platform:</strong> {train.departure.platform}
        </p>
      </div>

      <div className="detail-section">
        <h3>Arrival</h3>
        <p>
          <strong>Station:</strong> {train.arrival.city}
        </p>
        <p>
          <strong>Time:</strong> {train.arrival.time}
        </p>
        <p>
          <strong>Platform:</strong> {train.arrival.platform}
        </p>
      </div>

      <p>
        <strong>Journey Duration:</strong> {train.duration}
      </p>

      <h3>Intermediate Stops:</h3>
      <ul>
        {train.stops.map((stop, index) => (
          <li key={index}>{stop}</li>
        ))}
      </ul>
    </div>
  );
}
