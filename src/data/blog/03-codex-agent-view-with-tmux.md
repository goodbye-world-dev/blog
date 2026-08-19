---
title: "I Wanted Agent View. I Got tmux."
description: "A small tmux setup became the multi-session Codex dashboard I was missing."
pubDatetime: 2026-08-19T08:09:00Z
tags: ["codex", "tmux", "agents", "tooling", "my-setup"]
draft: false
---

## The missing view

Claude Code has Agent View: one ~~ring~~ place to rule them all. I wanted something similar for Codex.

In the [previous post](/posts/02-chicken-and-egg-of-agentic-flow), I called myself the bus carrying context between agents. This did not turn me into the boss. It gave the bus a dashboard.

Terminal tabs worked perfectly until the third Codex session. Then they became a small shell game: click a tab, find the wrong agent, repeat.

Of course, one of those sessions eventually sat waiting for approval while I was busy in another tab. Who hasn't done that?

The useful question was not “How many agents are running?” It was “Which one needs me now?”

## Returning to tmux

I had used tmux years ago, then put it in the mental drawer labelled “useful things I will definitely remember.” I did not remember. Luckily, tmux did not mind.

I looked around first. Everything I found either pulled the workflow out of the terminal or asked me to run one more service. I wanted neither.

Meanwhile, tmux was already there. It had the difficult parts: persistent sessions, named windows, keyboard navigation, scrollback, and reconnecting after closing the terminal — though not after rebooting the machine.

There was no dashboard service to run and no young dependency to bet on. tmux is old, boring, and available almost everywhere. For this job, those are excellent product features.

It also preserved one detail I liked: Codex runs inside a normal shell. Pressing `Ctrl+C` exits Codex, but the window stays open in the same project directory. Small thing, surprisingly useful.

## The `tcodex` workflow

The result is a command called `tcodex`. Outside tmux, `tcodex blog` creates or reuses a session called `codex`. Inside tmux, it stays in the current session instead of trying to build a second universe inside the first.

In both cases it keeps a launcher window named `codex-central` at index 0 and opens Codex in a new window for the requested project.

Opening another project is one command:

```sh
tcodex blog
```

Each call adds another project window, automatically named after the directory it opens. I can move between windows by arrow keys or indexes, detach from the workspace, and reconnect without losing the running sessions.

Codex lifecycle hooks add the missing awareness. A window shows `WORK` while Codex is processing, `IDLE` when it has finished, and a blinking `INPUT` when it requests approval.

It is less dramatic than the beacons of Gondor, but it gets me to the right window before anyone has to light the next mountain.

Active subagents also appear in the label. One agent gets a type, such as `reviewer`; several agents get a count. I do not need their life stories, just enough to know that the robots are still busy.

The status line is easy to read at a glance:

```text
codex  0:codex-central  1:blog 🟡 WORK 🤖2  2:kamerdyner 🔴 INPUT  3:time-tracker 🟢 IDLE
```

I kept the hook small enough to read in one sitting. It sees lifecycle event names and IDs, not prompts or replies, and sends nothing over the network. It only turns those events into tmux labels.

The installer merges the configuration and backs up existing files before touching them. Codex still asks me to review and trust the new hook commands. Untrusted hooks shall not pass.

## A workaround worth keeping

I expected tmux to be a temporary substitute for a native Agent View. After using it for a while, I am less certain that I need anything heavier.

I get one terminal, several durable Codex sessions, visible project names, and a clear signal showing where I am needed. It is simple enough that I understand every layer and can change it when my workflow changes.

Not bad for a tool released before AI agents, GitHub, and some of my colleagues.

I expect it to grow the way my most useful tools grow: one annoyance at a time.

The setup is now public as [codex-tmux-central](https://github.com/goodbye-world-dev/codex-tmux-central). It started as a personal convenience, but perhaps other Codex users are missing the same small dashboard.
