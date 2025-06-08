import { randomDelay } from '@/app/components/utills';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles GET requests to /api/products.
 * @param request The incoming request object.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ source: string }> }) {
  // TODO remove if not needed
  await randomDelay(200, 2000)

  // path params
  const { source } = await params;
  // query params
  const url = request.nextUrl
  // TODO do something with this
  const search = url.searchParams.get('search')

  // TODO call API
  const allData: Island[] = [
    {
      id: 'trending',
      title: 'Trending Now',
      results: [
        {
          id: '1',
          title: 'The Galactic Odyssey',
          description: 'An epic space adventure that has captured the hearts of millions.',
          date: '2024-03-18',
          details: 'This is an epic space adventure that has captured the hearts of millions. The film transports viewers across galaxies, weaving a tale of courage, exploration, and discovery among the stars. The story unfolds with breathtaking visuals and emotional depth, offering an unforgettable cinematic experience.'
        },
        {
          id: '2',
          title: 'Mystery in Manhattan',
          description: 'A gripping detective thriller set in the bustling city.',
          date: '2023-09-05',
          details: 'This gripping detective thriller is set in the bustling city of Manhattan. It follows a brilliant detective as they unravel layers of deception and intrigue, navigating the urban landscape in search of truth. Each twist and turn deepens the suspense and engages the audience.'
        },
        {
          id: '3',
          title: 'Underwater Kingdom',
          description: 'A visually stunning journey to the world beneath the sea.',
          date: '2023-12-22',
          details: 'A visually stunning journey to the world beneath the sea, Underwater Kingdom invites viewers into a mesmerizing aquatic realm. With dazzling cinematography and an enchanting narrative, this film explores the mysteries and wonders of life beneath the waves.'
        },
      ],
    },
    {
      id: 'top-rated',
      title: 'Top Rated',
      results: [
        {
          id: '4',
          title: 'The Silent Forest',
          description: 'A deeply moving drama with award-winning performances.',
          date: '2024-05-14',
          details: 'A deeply moving drama with award-winning performances, The Silent Forest delves into the human experience with poignant storytelling. The film’s emotional depth and powerful acting leave a lasting impression on viewers, making it a standout in contemporary cinema.'
        },
        {
          id: '5',
          title: 'Rise of the Legends',
          description: 'A historical epic that redefines the genre.',
          date: '2023-07-28',
          details: 'Rise of the Legends is a historical epic that redefines the genre with its grand scale and attention to detail. The narrative spans significant events and legendary figures, offering audiences an immersive and thought-provoking cinematic journey.'
        },
        {
          id: '6',
          title: 'Comedy Nights',
          description: 'A hilarious collection of short comedy films.',
          date: '2024-01-09',
          details: 'Comedy Nights presents a hilarious collection of short comedy films that deliver non-stop laughter. Each segment brings its unique humor, crafted by talented filmmakers, providing a delightful viewing experience for audiences of all ages.'
        },
      ],
    },
    {
      id: 'coming-soon',
      title: 'Coming Soon',
      results: [
        {
          id: '7',
          title: 'Future Wars',
          description: 'A sci-fi blockbuster slated for next summer.',
          date: '2024-06-01',
          details: 'Future Wars is an eagerly anticipated sci-fi blockbuster slated for next summer. Featuring cutting-edge visual effects and a compelling narrative, the film explores futuristic conflicts and the resilience of the human spirit in an age of advanced technology.'
        },
        {
          id: '8',
          title: 'Romance in Rome',
          description: 'A charming love story set in the eternal city.',
          date: '2023-11-11',
          details: 'Romance in Rome is a charming love story set against the backdrop of the eternal city. The film captures the beauty of Rome and the blossoming relationship between two characters, offering a heartfelt and visually enchanting cinematic experience.'
        },
        {
          id: '9',
          title: 'Secrets of the Jungle',
          description: 'An exciting family adventure in the heart of the wild.',
          date: '2024-02-27',
          details: 'Secrets of the Jungle is an exciting family adventure set in the heart of the wild. The film follows the protagonists on a thrilling journey through uncharted territory, discovering the wonders of nature and forging unbreakable bonds along the way.'
        },
      ],
    },
  ];

  const data = allData.find(island => island.id === source);

  if (!data) {
    console.error(`No data found for: ${source}`)
  }

  return NextResponse.json(data);
}