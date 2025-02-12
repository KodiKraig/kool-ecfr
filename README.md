# Kool eCFR - Code of Federal Regulations

A simple tool to help you view metrics for any agency in the Code of Federal Regulations (CFR).

_This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`._

## Metrics Included

- Number of CFR references per agency
- Number of historical changes per agency

## Running the project

1. Clone the repository

```bash
git clone https://github.com/kool-ecfr/kool-ecfr.git
```

2. Copy the `.env.example` file to `.env` and set the `ECFR_BASE_URL` environment variable

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