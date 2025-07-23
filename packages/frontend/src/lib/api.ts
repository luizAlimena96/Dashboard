const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchMachineStatus = () =>
  fetch(`${API_BASE_URL}/status`).then((res) => res.json());

export const fetchMachineAlerts = (id: string) =>
  fetch(`${API_BASE_URL}/${id}/alerts`).then((res) => res.json());

export const fetchMachineMetrics = (
  id: string,
  limit: number,
  offset: number
) =>
  fetch(`${API_BASE_URL}/${id}/metrics?limit=${limit}&offset=${offset}`).then(
    (res) => res.json()
  );
