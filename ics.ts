import ical from 'node-ical';
export async function parseIcs(url: string) {
  const data = await ical.async.fromURL(url);
  const events = Object.values(data).filter((e: any) => e.type === 'VEVENT');
  return events.map((e: any) => ({
    uid: e.uid as string | undefined,
    start: new Date(e.start),
    end: new Date(e.end),
    summary: e.summary as string | undefined,
  }));
}
