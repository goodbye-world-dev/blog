---
title: "The Chicken and the Egg of Agentic Flow"
description: "Do you pick the tools first, or build the flow first? I started with the flow — four skills, two agent CLIs, and one rule: whoever writes the code never reviews it."
pubDatetime: 2026-08-17T18:00:00Z
tags: ["agents", "orchestration", "code-review", "workflow"]
---

It took me a while to get to this second post — better late than never. My goal is to orchestrate the Software Development Life Cycle (SDLC) with AI agents. That handed me a chicken-and-egg problem. Should I research the best tools for agentic workflows and then build a flow around them? Or build the flow first and run it with whatever tooling fits? Tooling in this space changes every month, so I started with the flow — and as the human in the loop, I would be its orchestrator.

## The project

The project is Kamerdyner — Polish for butler, which is the whole point. It is a personal task manager; yes, a todo list, I hear it too. But the hard part is not the list: an always-on daemon with a terminal UI on top, GitHub Issues as the source of truth mirrored into local SQLite, crash-safe mutations, an offline outbox that replays in order, and AI that stays invisible — no chatbot anywhere. Not trivial, not enterprise: small enough to keep in my head, big enough that getting it wrong corrupts state.

In my first iteration I focused on the implementation phase only. Requirements gathering was out of scope: it happened in a separate process using [Matt Pocock's set of skills](https://github.com/mattpocock/skills), and its output was a set of issues published on GitHub. Now comes the interesting part — four skills, one per step of the loop. `next-issue-prompt` prepares the prompt for the next issue, `pr-review` reviews the pull request, `pr-fix` addresses what the review found, and `pr-fix-check` verifies the fix actually did that rather than merely claiming to. None of them says what to build; they describe how the work should proceed. The details live in the repo.

## Nobody reviews their own work

I used the CLI versions of both Claude Code and Codex. The orchestration was mine: I called the skills in a fixed order and merged the pull requests on GitHub. To mix things up I switched the roles — on one issue Claude wrote the code and Codex reviewed it; on the next, they swapped. The rule underneath: the same model never both implements and reviews. In my runs the model reviewing its own work still found issues — just not the important ones.

## One run, end to end

Issue #29: a review view in the TUI, plus a drift banner — a warning that the local mirror has fallen out of step with the source of truth. The implementation landed as PR #34, +705/-11. The reviewing model came back with four findings — one blocker, two high, one medium. The blocker was real: "reviewed" was being marked on transport success instead of domain success, so a rejected decision left the candidate sitting in the queue while the server cheerfully returned HTTP 200. The fix was a single commit, ff26f60, addressing all four findings with regression tests. Then a separate pass checked whether the fixer had actually fixed anything. That sounds paranoid right up until the first time it catches a claim that does not hold.

Twenty-one issues, all closed, and twenty-three merged pull requests — the two extra were documentation, with no issue behind them. Fifteen came back with findings to fix, and half of them went from opened to merged in under three hours.

What surprised me most was how easy it was. And one thing I did not expect: the model took correction from a pull request better than some developers I have worked with. No defensiveness, no negotiation. Just the fix and the test. Easy is not the same as autonomous, though — every one of those steps still needed me in the room.

## Honestly, though: I am the bus

This setup makes no production sense. Two sessions open side by side, every step fired by hand, context carried between them by me. I built a system where agents supervise each other, then became the transmission belt running between them. That is not agentic development yet — it is manual orchestration with agents in the roles. These skills want to be nodes in an orchestration graph, not commands I click. The chicken-and-egg question answered itself along the way: nothing here depended on which CLI sat on which side of the loop, so starting from the flow was the right bet. That is the next step: moving the human from bus to boss — one letter, and most of the work still ahead.
