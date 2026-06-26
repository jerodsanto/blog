---
title: GitHub under siege
stab:
slug:
date: 2026-06-25T19:46:17.451Z
draft: false
image: github-under-siege.jpg
---
My first thought when I saw Cursor's [Origin announcement](https://cursor.com/origin) last week was:

>  You could see this move coming [a mile away](https://changelog.com/friends/101#transcript-126)

My second thought was:

> Dang, GitHub really is under siege

Cursor is now building[^1] the exact thing that GitHub *is*: the place our code actually lives. Their announcement is what sent me down this rabbit hole, but it's certainly not where the story starts. Origin is yet another data point in a pattern I've been watching for a long time. [A long time](https://www.youtube.com/watch?v=031vKBPk5eA).

- The outages. So many outages. 
- The defections. Both big names and no names.
- The quiet absorption into Microsoft's AI org.
- Thomas Dohmke raising big bucks to build a competitor.

Each of these is a story on its own. Put them next to a $4B editor company[^2] announcing a forge... these are not coincidences. A trend line is forming.

For perhaps the first time since the days of [yore](https://sourceforge.net), GitHub's position as *the* place we put our code is genuinely in doubt. For multiple reasons.

## The siege from within

GitHub's reliability has fallen apart. 

IncidentHub [tracked 257 separate incidents](https://blog.incidenthub.cloud/github-reliability-outage-history-2025-2026) between May 2025 and April 2026. **48 of them were major outages**. That's roughly one significant disruption per week for a year. The service hit hardest was Actions, with 57 outages. When Actions goes down, many teams' ability to ship goes down with it.[^3]

To GitHub's credit, they didn't hide from it. CTO Vlad Fedorov [said the quiet part out loud](https://github.blog/news-insights/company-news/an-update-on-github-availability/): the platform isn't built for the load it's now carrying. They'd planned to scale capacity 10x. Then realized they needed *30x*. Apparently, **AI agents are to blame**. Agentic workflows took off in late December and aren't slowing down any time soon. Vlad called the incidents "not acceptable", which is hard to disagree with!

Plus, the numbers might even be worse. GitHub changed how it reports uptime, so that "Degraded Performance" now counts as 0% downtime. [Marek Suppa](https://mareksuppa.com) got annoyed enough to build [The Missing GitHub Status Page](https://mrshu.github.io/github-statuses/), reconstructing the real numbers from archives. When your users build forensic tools to audit your status page, something ain't right...

It's not as if trust was at an all-time high either.

In August of last year, CEO Thomas Dohmke [announced]() he was stepping down to go be a founder again. Cool, happens all the time. Except Microsoft didn't replace him with another CEO. Instead, GitHub [got folded into](https://www.tomshardware.com/software/programming/github-folds-into-microsoft-following-ceo-resignation-once-independent-programming-site-now-part-of-coreai-team) Microsoft's CoreAI division. I remember when Microsoft bought GitHub in 2018. The [whole pitch](https://news.microsoft.com/source/2018/06/04/microsoft-to-acquire-github-for-7-5-billion/) was that GitHub would stay independent. Things were good at first, but seven years later... here we are.[^4]

Gergely Orosz [put it bluntly](https://x.com/GergelyOrosz/status/2011950905038459189) back in January. 

> I keep being amused that Microsoft decided to leave GitHub without a CEO and independence - playing reorg games instead of reinventing themselves - right when GitHub would desperately need to. AI makes existing workflows useless.
>
> All set for a startup to take on GitHub

All set, indeed.

## The defections

Complaining is easy, but actually leaving is hard. And people are leaving.

The one that broke developer socials for a day in April was Mitchell Hashimoto [announcing that Ghostty](https://mitchellh.com/writing/ghostty-leaving-github) is out. Mitchell is GitHub user #1299. Plus he has a bajillion dollars so we can assume his moves aren't motivated by a desire to convert attention into money. He kept an actual journal for a month, marking every day a GitHub outage blocked his work. "*Dear diary...*"

> Almost every day has an X. On the day I am writing this post, I've been unable to do any PR review for ~2 hours because there is a GitHub Actions outage.

Mitchell did not mince words:

> This is no longer a place for serious work… I want to ship software, and it doesn't want me to ship software.

Ghostty's exodus brought a lot of eyeballs, but it's not nearly the only example. The "*I left GitHub*" [blog post](https://lord.io/leaving-github/) is quickly becoming its own genre, right next to:

- "*$X is better than $Y*"
- "$X considered harmful"
- "*Why I wrote my own $X*"

There's been a steady stream of developers [moving personal projects](https://www.andrlik.org/dispatches/migrating-from-github-motivation/) to self-hosted [Forgejo](https://forgejo.org/) instances, open source repos to [Codeberg](https://codeberg.org), and static sites [off GitHub Pages](https://blog.diego.dev/posts/moving-off-github-pages/). 

The reasons aren't always the same, but they usually rhyme: [platform lock-in, governance concerns, centralization risk](https://dev.to/alanwest/how-to-migrate-your-open-source-project-away-from-github-10h0), and feature gaps for workflows GitHub never prioritized.

## Enemies at the gate

Now back to what got me thinking. The part that might actually scare GitHub. 

Cursor's Origin isn't the only threat. There's a credible crop of new platforms being built in position to take GitHub's place, and they have a common perspective: **the primary author of code is no longer human**. 

When agents are opening PRs faster than any human can review them, a system designed in 2008 around a person reading a diff in a browser and clicking merge[^5] is the wrong foundation.

**Origin** is, in my opinion, the one to watch. Cursor already owns the editor where the code gets written. Origin will extend that ownership downstream into hosting, review, merge, and more. If you already live in Cursor all day, why would you ever tab over to GitHub? They also [bought Graphite back in December](https://siliconangle.com/2025/12/19/cursor-acquires-ai-code-review-startup-graphite/), so Origin can be built on the best stacked-diffs workflow out there. Agents are going to love that.[^6]

**Entire** is a dark horse with a great pedigree. It's Thomas Dohmke's new thing. Yes, the *former GitHub CEO*. He [raised $60M](https://techcrunch.com/2026/02/10/former-github-ceo-raises-record-60m-dev-tool-seed-round-at-300m-valuation/)[^7] to build a "semantic reasoning layer" that captures the *why* behind code, not just the *what*. His [framing](https://thenewstack.io/thomas-dohmke-interview-entire/) is that a GitHub repo stores what the software does but is missing all the reasoning that got you there. Their first open source product, [Checkpoints](https://docs.entire.io/cli/checkpoints), captures the agent's prompts and decisions on every commit. Thomas insists he *isn't* competing with GitHub for repo hosting. He wants to sit a layer *above* it, which to me sounds like "turn it into a commodity."[^8]

Don't forget **Claude Code** and **Codex**, which live at the highest leverage point in the entire SDLC: the developer's prompt. From that position, they are just one effective nudge away from inserting their own GitHub replacements. 

> "Want to try our shiny, new hosting solution? It uses 10x less tokens than traditional providers."

Good thing Anthropic and OpenAI have shown zero interest in [Sherlocking](https://thehustle.co/sherlocking-explained) their ecosystems...

Then there's the **autonomous-agent platforms**: [Cognition's Devin](https://cognition.com) and [Factory's Droids](https://factory.ai), which threaten GitHub from a different angle. They don't host your repos, but they absorb the entire process into their own consoles. When you manage agents like contractors from a dashboard, GitHub's collaboration surface becomes plumbing you never look at.

Finally, there's the steady proliferation of **sovereignty forges**: Forgejo, Codeberg, [Gitea](https://about.gitea.com), [Radicle](https://radicle.dev), et al. These win devs who've decided the real problem is that one company[^9] controls this much of the world's code.

## This is not an obit

GitHub is in a spot, but I don't want to start any rumors of its demise. They would be greatly exaggerated.

180 million developers don't evaporate overnight. Inertia is a [hell of a drug](https://www.youtube.com/watch?v=RZ16H0hsQiQ). The network effects are real. Actions and the ecosystem are both heavy hitters. 

I just think it's *a fascinating moment* for a company that's been at the center of software development most of my career. Agentic coding is doing three things to GitHub *simultaneously*:

1. Straining its infrastructure to the breaking point
2. Enabling "agent-native" competitors
3. Driving its own [roadmap](https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience/) for the future

That's a lot to deal with. Which begs the question: In a world where GitHub is trying to re-architect for agent-heavy workloads, under active fire, while the agentic era is the exact thing that has it under siege... 

Maybe it's time to name Steven Seagal as the next CEO?[^10]

![GitHub Under Siege movie poster with Steven Seagal in officer's uniform](github-under-siege.jpg)


[^1]: Grain of salt: They've shipped nothing yet. Could be vaporware...
[^2]: Now owned by some of the deepest (and most ruthless) pockets in the 'Verse
[^3]: And as we all know, [real artists still ship](/2026/06/real-artists-still-ship)
[^4]: Fool me once, [shame on you](https://www.youtube.com/watch?v=Hl7FKfl3O2Y)
[^5]: Fun bit of history: the merge button wasn't there from the start. It was added as part of [Pull Requests 2.0](https://github.blog/news-insights/pull-requests-2-0/) in 2011
[^6]: Speaking of agents loving things: [AX is my favorite new jargon](https://agentexperience.ax/)
[^7]: Reportedly the largest dev-tools seed round of all times
[^8]: A lot like what GitHub did to git itself
[^9]: 20 years ago, I would have called them "Evil Empire" here. Adulting!
[^10]: You caught me. I started with this poster. It was my motivation to actually take the time to write all this.