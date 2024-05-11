import { xml } from "@xmpp/client";

class Mechanism {}

Mechanism.prototype.Mechanism = Mechanism;
Mechanism.prototype.name = "X-Riot-RSO";
Mechanism.prototype.clientFirst = true;

Mechanism.prototype.response = (cred) => {
    return xml("rso_token", { xmlns: "" }, cred.rsoToken);
};

export { Mechanism };
