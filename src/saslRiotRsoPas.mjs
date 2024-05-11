import { xml } from "@xmpp/client";

class Mechanism {}

Mechanism.prototype.Mechanism = Mechanism;
Mechanism.prototype.name = "X-Riot-RSO-PAS";
Mechanism.prototype.clientFirst = true;

Mechanism.prototype.response = (cred) => {
    return [
        xml("rso_token", { xmlns: "" }, cred.rsoToken),
        xml("pas_token", { xmlns: "" }, cred.pasToken),
    ];
};

export { Mechanism };
