# riot-xmpp-client-example

<div align="center">

[![github](https://img.shields.io/badge/github-ev3nvy/riot--xmpp--client--example-181717?logo=github&style=for-the-badge)][repository]
[![Discord](https://img.shields.io/discord/1007597805956780062?color=5865F2&label=discord&logo=discord&logoColor=FFFFFF&style=for-the-badge)][discord]
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/ev3nvy/riot-xmpp-client-example/ci.yml?branch=main&style=for-the-badge)][repository]

</div>

---

Example project for connecting to riot xmpp servers using [`xmpp.js`][xmpp.js].

## Running
### 1. Install dependencies
```console
pnpm install
```

### 2. Run
```console
node .
```


## How it works
This project patches [`@xmpp/sasl`][xmpp-sasl] to make SASL negotiation work with Riot XMPP
servers. For more information see [this discussion post][xmpp-patch].


### Patching
Patching is done via [`pnpm patch`][pnpm-patch], so it probably doesn't work with other package
managers (I haven't tested it). You can instead adapt the project to use
[`yarn patch`][yarn-patch] if you use yarn or [`patch-package`][patch-package] for a more
universal solution. If you'd like to make a lib instead you'd probably have to fork the
[`@xmpp/sasl`][xmpp-sasl] project and depend on the patched version.


## Contributing
First of all, thank you, if you find any bugs or issues when using this example, feel free to
create an issue or open a pull request (to the main branch).

See the [license section](#license) for how the project is licensed.


## Seeking help
If you need any help with running the example, or have any questions, feel free to open an issue,
or ask for assistance [on discord][discord].


## Acknowledgements
Amazing people at [Valorant App Developers discord][discord-valappdev].


## Legal
Riot Games, VALORANT, and any associated logos are trademarks, service marks, and/or registered
trademarks of Riot Games, Inc.

This project is in no way affiliated with, authorized, maintained, sponsored or endorsed by Riot
Games, Inc or any of its affiliates or subsidiaries.

I, the project owner and creator, am not responsible for any legalities that may arise in the use
of this project. Use at your own risk.


## License
Licensed under either of [Apache License, Version 2.0](LICENSE-APACHE) or
[MIT license](LICENSE-MIT) at your option.

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in
this project by you, as defined in the Apache-2.0 license, shall be dual licensed as above,
without any additional terms or conditions.

<!-- Project links -->
[crates-io]: https://crates.io/crates/rman
[discord]: https://discord.gg/5QVVBKBvpQ
[docs-rs]: https://docs.rs/rman
[github-pages-docs]: https://ev3nvy.github.io/rman-rs
[repository]: https://github.com/ev3nvy/riot-xmpp-client-example


<!-- References -->
[xmpp.js]: https://github.com/xmppjs/xmpp.js
[xmpp-sasl]: https://github.com/xmppjs/xmpp.js/tree/main/packages/sasl
[xmpp-patch]: https://github.com/xmppjs/xmpp.js/discussions/951
[pnpm-patch]: https://pnpm.io/cli/patch
[yarn-patch]: https://yarnpkg.com/features/patching
[patch-package]: https://www.npmjs.com/package/patch-package
[discord-valappdev]: https://discord.gg/a9yzrw3KAm
