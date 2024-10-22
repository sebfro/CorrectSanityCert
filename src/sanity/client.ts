import {createClient} from "next-sanity";

export const client = createClient({
    projectId: '73ed36lq',
    dataset: 'production',
    apiVersion: "2024-01-01",
    useCdn: false,
})