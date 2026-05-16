export const ESTIMATED_SEATS_PER_ROOM = 30;

export function getEstimatedSeatCount(availableRooms: number) {
  return availableRooms * ESTIMATED_SEATS_PER_ROOM;
}
