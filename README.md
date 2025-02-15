# Kool eCFR - Code of Federal Regulations

A simple tool to help you view metrics for any agency in the [Code of Federal Regulations (eCFR)](https://www.ecfr.gov/).

_This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`._

## Historical Metrics Feature

- Reference locations for the agency in the CFR
- Chart view of the agency's regulation changes over time
- View total, average, maximum, and number of days with changes for the agency
- Hierarchical view of the agency's regulation changes with totals for each title and chapter

## Query Feature

- Filter the CFR by keywords and agencies
- View occurrences of the query within the CFR across all titles in a chart
- View the total, average, and maximum occurrences for the query across all titles
- View search results by CFR section with text excerpts for each occurrence

## Running the project

1. Clone the repository

```bash
git clone https://github.com/KodiKraig/kool-ecfr.git
```

2. Copy the `.env.example` file to `.env`

```bash
cp .env.example .env
```

3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```