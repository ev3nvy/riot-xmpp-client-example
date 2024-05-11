import { createInterface } from "node:readline/promises";

import { client, xml } from "@xmpp/client";
// import debug from "@xmpp/debug";

import { Mechanism as MechanismRiotRso } from "./saslRiotRso.mjs";
import { Mechanism as MechanismRiotRsoPas } from "./saslRiotRsoPas.mjs";

/**
 * @type {import('./index').XmppEventHandler<'error'>}
 */
function handleError(_xmpp, error) {
    console.error(error);
}

/**
 * @type {import('./index').XmppEventHandler<'offline'>}
 */
function handleOffline(_xmpp, _el) {
    console.log("offline");
}

/**
 * @type {import('./index').XmppEventHandler<'stanza'>}
 */
async function handleStanza(xmpp, stanza) {
    if (stanza.is("message")) {
        await xmpp.send(xml("presence", { type: "unavailable" }));
        await xmpp.stop();
    }
}

/**
 * @type {import('./index').XmppEventHandler<'online'>}
 */
async function handleOnline(xmpp, jid) {
    console.log("online");

    // makes itself available
    await xmpp.send(xml("presence"));

    // sends a chat message to itself
    const message = xml("message", { type: "chat", to: jid }, xml("body", {}, "hello world"));
    await xmpp.send(message);
}

/**
 * @type {import('@xmpp/sasl').CredentialsFactory}
 */
async function authenticate(auth, mechanism) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    console.debug("authenticate", mechanism);

    // you can hook this up to some function that authenticates instead
    const credentials = {
        rsoToken: await rl.question("Please input your rso token: "),
        pasToken: await rl.question("Please input your pas token: "),
    };
    console.debug("authenticating");
    rl.close();

    try {
        await auth(credentials);
        console.debug("authenticated");
    } catch (err) {
        console.error(err);
        throw err;
    }
}

(async () => {
    const xmpp = client({
        // change euw1 to affinity region of your account
        service: "xmpps://euw1.chat.si.riotgames.com:5223",
        // change eu1 to domain region of your account
        domain: "eu1.pvp.net",
        mech: "X-Riot-RSO-PAS",
        // if you'd like to just hard-code credentials instead (for testing purposes), you need to
        // also provide a username field (because otherwise sasl defaults to ANONYMOUS), the
        // username can be whatever you want (it is internally never used afaik)
        // credentials: {
        //     username: "yowaddup",
        //     rsoToken: "RSO token here",
        //     pasToken: "PAS token here",
        // },
        credentials: authenticate,
    });

    xmpp.sasl.use(MechanismRiotRsoPas);
    xmpp.sasl.use(MechanismRiotRso);

    // uncomment below to enable verbose logging
    // debug(xmpp, true);

    xmpp.on("error", (...args) => handleError(xmpp, ...args));
    xmpp.on("offline", (...args) => handleOffline(xmpp, ...args));
    xmpp.on("stanza", (...args) => handleStanza(xmpp, ...args));
    xmpp.on("online", (...args) => handleOnline(xmpp, ...args));

    xmpp.start().catch(console.error);
})();
