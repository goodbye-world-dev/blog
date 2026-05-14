---
title: "Hello from Goodbye World"
description: "Why I'm starting this blog and what to expect."
pubDatetime: 2026-05-14T10:00:00Z
tags: ["meta", "agents"]
featured: true
---

I'm Paweł, and I'm spending the next few months going deep on **AI agent orchestration** — orchestrators, sandboxes, protocols like MCP and ACP, observability, the whole stack. This blog is the lab notebook from that journey.

## Why "Goodbye World"

"Hello world" is what you write when you start. "Goodbye world" is what an agent does after it's spun up its own sandbox, executed a plan, and shut itself down — leaving only an artifact behind. That feedback loop, where you orchestrate something and then step out of the way, is the part of agentic systems I want to understand cold.

## What's coming

A six-post series, written in public as I learn:

1. **What is AI agent orchestration and why I'm diving in** — mental model, MCP vs ACP
2. **The 2026 landscape of agent orchestration tools** — 16 tools, condensed and categorised
3. **CrewAI vs the Anthropic SDK** — two approaches to multi-agent pipelines, side-by-side code
4. **Designing a pipeline from brief to deploy** — DAG scheduling, human gates, the Dev→Review→Test loop
5. **Archon — my first POC** — GitHub issue → plan → implement → validate → PR
6. **Agent observability** — what's worth watching and what's noise

Each post follows the same shape: what I wanted to understand, what I tried, what I learned, working code, and the next question that opened up.

## Stay in the loop

The blog has an [RSS feed](/rss.xml) — that's the only follow mechanism for now. Newsletter comes later, once there's enough material to be worth subscribing to.

Code from each post will live in a companion repo. First post drops soon.
