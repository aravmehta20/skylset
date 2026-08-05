# Data Pipeline

## Overview

Skylset collects publicly available opportunity listings from opportunity aggregation websites using Playwright browser automation.

```text
Opportunity Aggregators

↓

Playwright

↓

Extract Listing Information

↓

Normalize Data

↓

Manual Review

↓

Supabase Database

↓

Skylset Website
```

## Extracted Fields

Each listing may contain:

- Name
- Opportunity Type
- Description
- Location
- Cost
- Area of Interest
- Deadline
- Official URL

## Data Validation

Missing information is stored as `null` rather than guessed.

Each record is manually reviewed before being uploaded.

## Limitations

- Aggregator websites change frequently.
- Opportunity information may become outdated.
- Official program websites remain the source of truth.
