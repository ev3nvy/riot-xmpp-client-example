import { xml } from "@xmpp/client";

/**
 * @typedef {import("./roster").Roster} Roster
 * @typedef {import("./roster").RosterItem} RosterItem
 */

/**
 * Get riotgames roster query (aka. friends list).
 */
const getRosterXml = xml(
    "iq",
    { type: "get" },
    xml("query", { xmlns: "jabber:iq:riotgames:roster" }),
);

/**
 * Parse riotgames roster query response item (aka. single friend entry in friends list).
 * @param {import('@types/ltx').Element} element
 * @returns {RosterItem}
 */
function parseRosterItem(element) {
    const { jid, name, subscription, puuid, ...other } = element.attrs;
    if (Object.keys(other).length > 0) {
        console.warn("Roster item contained unknown data:");
        console.dir(other);
    }

    const idElement = element.getChild("id");
    const { name: idName, tagline: idTagline, ...idOther } = idElement?.attrs || {};
    if (Object.keys(idOther).length > 0) {
        console.warn("id element in roster item contained unknown data:");
        console.dir(idOther);
    }
    const riotId = idElement
        ? {
              name: idName || null,
              tagline: idTagline || null,
              ...idOther,
          }
        : null;

    const platformsElementChildren = element.getChild("platforms")?.children || [];
    const { riot: platformsRiot, ...platformsOther } = Object.fromEntries(
        platformsElementChildren.map((child) => [child.name, child.attrs]),
    );
    if (Object.keys(platformsOther).length > 0) {
        console.warn("platforms element in roster item contained unknown children:");
        console.dir(platformsOther);
    }

    const {
        name: platformsRiotName,
        tagline: platformsRiotTagline,
        ...platformsRiotOther
    } = platformsRiot || {};
    if (Object.keys(platformsRiotOther).length > 0) {
        console.warn("riot element in roster item platforms contained unknown data:");
        console.dir(platformsRiotOther);
    }
    const platformsRiotId = platformsRiot
        ? {
              name: platformsRiotName || null,
              tagline: platformsRiotTagline || null,
              ...platformsRiotOther,
          }
        : null;

    const platforms =
        platformsElementChildren.length === 0
            ? null
            : {
                  riot: platformsRiotId,
                  ...platformsOther,
              };

    const lolElement = element.getChild("lol");
    const { name: lolName, ...lolOther } = lolElement?.attrs || {};
    if (Object.keys(lolOther).length > 0) {
        console.warn("lol element in roster item contained unknown data:");
        console.dir(lolOther);
    }

    return {
        jid,
        name: name || null,
        subscription,
        puuid,
        riotId,
        platforms,
        summonerName: lolName || null,
        ...other,
    };
}

/**
 * Parse riotgames roster query response (aka. friends list).
 * @param {import('@types/ltx').Element} element
 * @returns {Roster}
 */
function parseRoster(element) {
    if (!element.is("query", "jabber:iq:riotgames:roster")) return null;

    const items = element.getChildren("item").map(parseRosterItem);

    const friends = items
        .filter((item) => item.subscription === "both")
        // biome-ignore lint/correctness/noUnusedFunctionParameters: subscription is intentionally dropped here
        .map(({ subscription, ...other }) => other);
    const incoming = items
        .filter((item) => item.subscription === "pending_in")
        // biome-ignore lint/correctness/noUnusedFunctionParameters: subscription is intentionally dropped here
        .map(({ subscription, ...other }) => other);
    const outgoing = items
        .filter((item) => item.subscription === "pending_out")
        // biome-ignore lint/correctness/noUnusedFunctionParameters: subscription is intentionally dropped here
        .map(({ subscription, ...other }) => other);

    return {
        friends,
        friendRequests: {
            incoming,
            outgoing,
        },
    };
}

export { getRosterXml, parseRoster, parseRosterItem };
