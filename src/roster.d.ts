export type Roster = {
    friends: RosterItem[];
    friendRequests: {
        incoming: RosterItem[];
        outgoing: RosterItem[];
    };
};

export type RosterItem = {
    /** Jabber identifier - {@link https://xmpp.org/extensions/xep-0029.html} */
    jid: unknown;
    /** User display name, should be the same as {@link RosterItem.summonerName | `summonerName`}. */
    name: unknown | null;
    /**
     * Subscription status
     *
     * Should be one of:
     * - `both` - friend
     * - `pending_in` - incoming friend request
     * - `pending_out` - outgoing friend request
     */
    subscription: unknown | null;
    /** Player uuid - {@link https://github.com/techchrism/valorant-api-docs/blob/trunk/docs/common-components.md#puuid | puuid} */
    puuid: unknown;
    /** Riot ID - {@link https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360041788533-Riot-ID-FAQ | What is a Riot ID?} */
    riotId: {
        /** Username */
        name: unknown | null;
        /** Tagline */
        tagline: unknown | null;
        [prop: string]: unknown;
    } | null;
    /** A list of platforms. */
    platforms: {
        /** Riot ID - {@link https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360041788533-Riot-ID-FAQ | What is a Riot ID?} */
        riot: {
            /** Username */
            name: unknown | null;
            /** Tagline */
            tagline: unknown | null;
            [prop: string]: unknown;
        } | null;
        [prop: string]: unknown;
    } | null;
    /** League of Legends name, should be the same as {@link RosterItem.name | `name`}. */
    summonerName: unknown | null;
    [prop: string]: unknown;
};
