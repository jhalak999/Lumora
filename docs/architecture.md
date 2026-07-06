# Lumora Architecture

## Overview

Lumora is a production-ready AI SaaS application that automates content creation using a modular multi-agent architecture.

The application enables users to create AI-powered content pipelines that generate:

- Research
- Scripts
- Scene plans
- AI image prompts
- Voiceovers
- Subtitles
- Videos
- Thumbnails
- SEO metadata

The system is designed with scalability, modularity, and maintainability in mind.

---

# Tech Stack

## Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query

## Backend

- FastAPI
- PostgreSQL
- SQLAlchemy
- Alembic
- JWT Authentication
- Pydantic
- OpenRouter API
- FFmpeg

---

# High-Level Architecture

```
                 React Frontend
                        │
                        │
                  REST API
                        │
                FastAPI Backend
                        │
      ┌─────────────────┴──────────────────┐
      │                                    │
  Feature Modules                     AI Agents
      │                                    │
      │                                    │
Repositories                    Research Agent
      │                          Script Agent
      │                          Scene Agent
      │                          SEO Agent
      │                          Image Agent
      │
 PostgreSQL
```

---

# Backend Structure

```
app/

core/

database/

features/

agents/

workers/

shared/
```

---

## Core

Contains infrastructure used across the application.

Examples:

- Configuration
- Security
- Logging
- Exception Handling

---

## Database

Responsible for:

- Database session
- SQLAlchemy configuration
- Base model
- Dependency injection

---

## Features

Each business feature is self-contained.

Example:

```
features/

auth/

projects/

dashboard/

generation/

assets/
```

Each feature contains:

- Router
- Service
- Repository
- Models
- Schemas

---

## Agents

Each AI capability is implemented as an independent agent.

Current planned agents:

- Research Agent
- Script Agent
- Scene Planner
- Image Prompt Agent
- SEO Agent
- Thumbnail Agent

Future agents can be added without modifying existing ones.

---

## Workers

Responsible for long-running tasks such as:

- Video rendering
- Voice generation
- Image generation

---

# Request Flow

```
Client

↓

API Router

↓

Service

↓

Repository

↓

Database
```

---

# AI Workflow

```
Topic

↓

Research Agent

↓

Script Agent

↓

Scene Planner

↓

Image Prompt Generator

↓

Voice Generator

↓

Subtitle Generator

↓

Video Renderer

↓

Thumbnail Generator

↓

SEO Generator
```

---

# Design Principles

- SOLID Principles
- Clean Architecture
- Feature-Based Modules
- Dependency Injection
- Repository Pattern
- Typed APIs
- Modular AI Agents
- Production-Ready Code

---

# Future Improvements

- Celery workers
- Redis queues
- Docker
- Kubernetes deployment
- Stripe subscriptions
- Team workspaces
- API rate limiting
- AI analytics
- Multiple LLM providers