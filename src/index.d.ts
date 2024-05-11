import type { Client } from "@types/xmpp__client";
import type { ConnectionEvents } from "@types/xmpp__connection";

type AddParameters<
    TFunction extends (...args: unknown) => unknown,
    TParameters extends [...args: unknown],
> = (...args: [...TParameters, ...Parameters<TFunction>]) => ReturnType<TFunction>;

export type XmppEventHandler<TEvent extends keyof ConnectionEvents> = AddParameters<
    ConnectionEvents[TEvent],
    [xmpp: Client]
>;
