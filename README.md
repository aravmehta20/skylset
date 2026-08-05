# Skylset

Skylset is a web platform that helps high school students discover and compare
internships, scholarships, research opportunities, clubs, and academic
programs.

[View the live application](https://aravmehta20.github.io/skylset/webpages/index.html)

![Skylset search interface](assets/readme/hero.png)

## Overview

Finding student opportunities often requires searching across unrelated
websites and interpreting inconsistent information. Skylset organizes
opportunities into a searchable database with structured fields, filters, and
a competitiveness rating.

## Features

- Search opportunities by name or keyword
- Filter by opportunity type, interest area, grade, location, cost, and deadline
- Compare internships, scholarships, research programs, and clubs
- View structured eligibility and application information
- Use SkylScore to compare reported competitiveness
- Responsive interface for desktop and mobile devices

## Technology

- HTML, CSS, and JavaScript
- Supabase database and authentication
- Python data-collection tools
- Playwright-based browser automation
- GitHub Pages deployment

## Architecture

```mermaid
flowchart LR
    A[Public opportunity websites] --> B[Data collection]
    B --> C[Data normalization and review]
    C --> D[(Supabase database)]
    D --> E[Skylset web application]
    E --> F[Search and filters]
    E --> G[Opportunity details]
    E --> H[User accounts]
