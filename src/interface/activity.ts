export interface IActivity {
  date: string,
  activities: {
    id: string;
    title: string;
    occursAt: string;
  }[]
}
