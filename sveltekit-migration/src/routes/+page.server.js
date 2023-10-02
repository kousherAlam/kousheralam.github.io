import fs from 'fs';
import yaml from 'js-yaml';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    let config = yaml.load(fs.readFileSync('contents/website-content.yml').toString("utf-8"));
    return config;
}
