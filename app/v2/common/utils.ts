export default function generatePlaceholders(n: number): string[] {
    return Array.from({ length: n }, (_, i) => `placeholder ${i + 1}`);
}