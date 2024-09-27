import { writable, type Writable } from "svelte/store";

type Nums = {
    name: string;
    score: string;
} | null

export const nums: Writable<Nums[]> = writable([])