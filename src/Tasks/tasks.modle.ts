import { Prisma } from "@prisma/client";

export class Tasks{
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public completed: boolean
    ){}
}