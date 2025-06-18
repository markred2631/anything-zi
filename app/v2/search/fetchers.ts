"use client"

import { MenuGroup, MenuOption } from "../menu/types";

/**
 * Returns a promise that resolves after a random delay between minDelay and maxDelay.
 *
 * @param minDelay - Minimum delay in milliseconds (inclusive)
 * @param maxDelay - Maximum delay in milliseconds (inclusive)
 */
function randomSleep(minDelay: number, maxDelay: number): Promise<void> {
    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

export async function fetchResults(menuGroup: MenuGroup, menuOption: MenuOption, searchQuery: string): Promise<ResultsGroup> {
    console.log(`started ${menuOption.name}`)
    await randomSleep(200, 6000)
    console.log(`finished ${menuOption.name}`)

    return {
        id: crypto.randomUUID(),
        title: menuOption.name,
        results: [
            {
                id: crypto.randomUUID(),
                title: "A title",
                description: "A description",
                date: "A date",
            },
            {
                id: crypto.randomUUID(),
                title: "A title",
                description: "A description",
                date: "A date",
            },
            {
                id: crypto.randomUUID(),
                title: "A title",
                description: "A description",
                date: "A date",
            },
            {
                id: crypto.randomUUID(),
                title: "A title",
                description: "A description",
                date: "A date",
            },
            {
                id: crypto.randomUUID(),
                title: "A title",
                description: "A description",
                date: "A date",
            },
            {
                id: crypto.randomUUID(),
                title: "A title",
                description: "A description",
                date: "A date",
            },
        ]
    }
}