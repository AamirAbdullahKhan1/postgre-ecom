import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node";
import "dotenv/config"

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        shield({
            //shield protects app from common attacks e.g. SQL injection, XSS, CSRF attacks 
            mode: "LIVE"
        }),
        detectBot({
            mode: "LIVE", //blocks all the bots except search engine
            allow: [
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),

        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        }),
    ],
})

