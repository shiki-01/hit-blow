import { A } from "flowbite-svelte";
import { writable, type Writable } from "svelte/store";

type Nums = {
    name: string;
    score: string;
} | null

export type GameType = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "abc" | "a2"
export type Digits = 3 | 4 | 5 | 6 | 7 | 8 | 9

export const nums: Writable<Nums[]> = writable([])

export const gameTypeS: Writable<GameType> = writable(9)
export const digitsS: Writable<Digits> = writable(3)

const abc = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export const keyboards = writable<string[][]>([])

export const setKeyboard = () => {
    keyboards.set([]);
    gameTypeS.subscribe((value) => {
        if (value === 'abc') {
            keyboards.set(abc);
        } else if (value === 'a2') {
            keyboards.set(
                Array.from({ length: 10 }, (_, i) => i).map((v) => v.toString().split(''))
            )
            keyboards.update((value) => {
                value.push(...abc);
                return value
            })
        } else {
            keyboards.set(
                Array.from({ length: value }, (_, i) => i).map((v) => v.toString().split(''))
            )
        }
    });
}