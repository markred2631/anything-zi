import { NextResponse } from 'next/server';

/**
 * Handles GET requests to /api/products.
 * @param request The incoming request object.
 */
export async function GET(request: Request) {
  // TODO call API
  const data = [
    { name: 'trending', active: true },
    { name: 'top-rated', active: true },
    { name: 'coming-soon', active: true },
  ];

  return NextResponse.json(data);
}