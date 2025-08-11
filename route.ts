import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const { message } = await req.json() as { message: { body: string } };
  const text = message?.body || '';
  const polite = `Bonjour,\n\nMerci pour votre message. `;
  let reply = '';
  if (/check-?in|arriv|heure/i.test(text)) {
    reply = polite + `L'arrivée est possible à partir de 15h. Accès autonome avec boîte à clés. Les instructions détaillées seront envoyées 48h avant.\n\nBelle journée,`;
  } else if (/parking|stationn/i.test(text)) {
    reply = polite + `Le parking le plus proche est le Parking Central (5 min à pied), env. 20€/jour. Dépose-minute devant l'immeuble.\n\nBien à vous,`;
  } else if (/annul|cancel/i.test(text)) {
    reply = polite + `L'annulation suit les conditions de la plateforme utilisée. Dites-moi si vous avez besoin d'une facture.\n\nCordialement,`;
  } else {
    reply = polite + `Je reviens vers vous rapidement avec plus d'informations. Précisez vos besoins (heure d'arrivée, nb de voyageurs, etc.).\n\nCordialement,`;
  }
  return NextResponse.json({ reply });
}
